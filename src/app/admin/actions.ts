'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import prisma from '../../../lib/prisma'

export async function login(formData: FormData) {
  const user = formData.get('username')
  const pass = formData.get('password')
  
  const admin1User = process.env.ADMIN1_USERNAME || 'admin'
  const admin1Pass = process.env.ADMIN1_PASSWORD || 'password'
  
  const admin2User = process.env.ADMIN2_USERNAME || 'admin2'
  const admin2Pass = process.env.ADMIN2_PASSWORD || 'password123'
  
  const isValidAdmin1 = (user === admin1User && pass === admin1Pass)
  const isValidAdmin2 = (user === admin2User && pass === admin2Pass)
  
  if (isValidAdmin1 || isValidAdmin2) {
    const c = await cookies()
    c.set('admin_auth', 'true', { maxAge: 60 * 60 * 24 })
    redirect('/admin')
  } else {
    redirect('/admin?error=1')
  }
}

export async function logout() {
  const c = await cookies()
  c.delete('admin_auth')
  redirect('/admin')
}

export async function uploadCSV(formData: FormData) {
  const file = formData.get('csv') as File;
  if (!file) return;

  const text = await file.text();
  const rows = text.split('\n').map(row => row.split(','));
  
  // Format expected: collegeName, state, courseTitle, stream, fee, timeInvolved, remarks, detailedAddress
  for (let i = 1; i < rows.length; i++) {
    const cols = rows[i];
    if (cols.length < 2) continue; // Basic skip for completely empty lines
    
    const [
      collegeName = '', 
      state = '', 
      courseTitle = '', 
      stream = '', 
      fee = '', 
      timeInvolved = '',
      remarks = '',
      detailedAddress = ''
    ] = cols;
    
    const safeCollege = collegeName.trim() || 'Unknown College';
    const safeTitle = courseTitle.trim() || 'Unknown Course';
    if (!safeCollege || !safeTitle) continue;

    const safeState = state.trim() || 'Not Specified';
    const safeAddr = detailedAddress.trim() || null;
    const safeStream = stream.trim() ? stream.trim().toUpperCase() : 'UNKNOWN';
    const safeFee = fee.trim() || 'Not Specified';
    const safeTime = timeInvolved.trim() || 'Not Specified';
    const safeRemarks = remarks.trim() || null;

    const college = await prisma.college.upsert({
       where: { name: safeCollege },
       update: { state: safeState, address: safeAddr || undefined },
       create: { name: safeCollege, state: safeState, address: safeAddr }
    });
    
    let course = await prisma.course.findFirst({ where: { title: safeTitle } });
    if (!course) {
       course = await prisma.course.create({
          data: { title: safeTitle, stream: safeStream }
       });
    }
    
    const existingLink = await prisma.collegeCourse.findFirst({
       where: { collegeId: college.id, courseId: course.id }
    });

    if (existingLink) {
       await prisma.collegeCourse.update({
          where: { id: existingLink.id },
          data: { fee: safeFee, timeInvolved: safeTime, remarks: safeRemarks }
       });
    } else {
       await prisma.collegeCourse.create({
          data: {
             collegeId: college.id,
             courseId: course.id,
             fee: safeFee,
             timeInvolved: safeTime,
             remarks: safeRemarks
          }
       });
    }
  }
  
  redirect('/admin')
}

export async function updateCourse(formData: FormData) {
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const stream = formData.get('stream') as string;
  
  if (!id || !title || !stream) return;
  
  await prisma.course.update({
    where: { id },
    data: { title: title.trim(), stream }
  });
}

export async function deleteCourse(formData: FormData) {
  const id = formData.get('id') as string;
  if (!id) return;
  
  await prisma.course.delete({ where: { id } });
}
