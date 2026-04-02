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
  if ((user === admin1User && pass === admin1Pass) || (user === admin2User && pass === admin2Pass)) {
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

// ── Colleges+Courses CSV ──────────────────────────────────────────────────────
export async function uploadCSV(formData: FormData) {
  const file = formData.get('csv') as File
  if (!file) return
  const text = await file.text()
  const rows = text.split('\n').map(row => row.split(','))
  for (let i = 1; i < rows.length; i++) {
    const cols = rows[i]
    if (cols.length < 2) continue
    const [collegeName = '', state = '', courseTitle = '', stream = '', fee = '', timeInvolved = '', remarks = '', detailedAddress = ''] = cols
    const safeCollege = collegeName.trim() || 'Unknown College'
    const safeTitle = courseTitle.trim() || 'Unknown Course'
    if (!safeCollege || !safeTitle) continue
    const college = await prisma.college.upsert({
      where: { name: safeCollege },
      update: { state: state.trim() || 'Not Specified', address: detailedAddress.trim() || undefined },
      create: { name: safeCollege, state: state.trim() || 'Not Specified', address: detailedAddress.trim() || null }
    })
    let course = await prisma.course.findFirst({ where: { title: safeTitle } })
    if (!course) {
      course = await prisma.course.create({ data: { title: safeTitle, stream: stream.trim().toUpperCase() || 'UNKNOWN' } })
    }
    const link = await prisma.collegeCourse.findFirst({ where: { collegeId: college.id, courseId: course.id } })
    if (link) {
      await prisma.collegeCourse.update({ where: { id: link.id }, data: { fee: fee.trim() || 'Not Specified', timeInvolved: timeInvolved.trim() || 'Not Specified', remarks: remarks.trim() || null } })
    } else {
      await prisma.collegeCourse.create({ data: { collegeId: college.id, courseId: course.id, fee: fee.trim() || 'Not Specified', timeInvolved: timeInvolved.trim() || 'Not Specified', remarks: remarks.trim() || null } })
    }
  }
  redirect('/admin')
}

// ── Entrance Tests CSV ────────────────────────────────────────────────────────
export async function uploadTestsCSV(formData: FormData) {
  const file = formData.get('testsCsv') as File
  if (!file) return
  const text = await file.text()
  const rows = text.split('\n').map(row => row.split(','))
  for (let i = 1; i < rows.length; i++) {
    const cols = rows[i]
    if (cols.length < 2) continue
    const [name = '', fullForm = '', suitability = '', eligibility = '', extraRemarks = ''] = cols
    const safeName = name.trim()
    if (!safeName) continue
    await prisma.entranceTest.upsert({
      where: { name: safeName },
      update: { fullForm: fullForm.trim(), suitability: suitability.trim(), eligibility: eligibility.trim(), extraRemarks: extraRemarks.trim() || null },
      create: { name: safeName, fullForm: fullForm.trim(), suitability: suitability.trim(), eligibility: eligibility.trim(), extraRemarks: extraRemarks.trim() || null }
    })
  }
  redirect('/admin')
}

// ── Recommendations ───────────────────────────────────────────────────────────
export async function addRecommendation(formData: FormData) {
  const collegeId = formData.get('collegeId') as string
  const adminRank = parseInt(formData.get('adminRank') as string)
  const targetStream = (formData.get('targetStream') as string) || null
  const reason = (formData.get('reason') as string) || null
  if (!collegeId || isNaN(adminRank)) return
  // Use findFirst+update/create to handle nullable targetStream in unique constraint
  const existing = await prisma.recommendation.findFirst({
    where: { collegeId, targetStream }
  })
  if (existing) {
    await prisma.recommendation.update({ where: { id: existing.id }, data: { adminRank, reason } })
  } else {
    await prisma.recommendation.create({ data: { collegeId, adminRank, targetStream, reason } })
  }
  redirect('/admin')
}

export async function deleteRecommendation(formData: FormData) {
  const id = formData.get('id') as string
  if (!id) return
  await prisma.recommendation.delete({ where: { id } })
  redirect('/admin')
}

export async function updateCourse(formData: FormData) {
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const stream = formData.get('stream') as string
  if (!id || !title || !stream) return
  await prisma.course.update({ where: { id }, data: { title: title.trim(), stream } })
}

export async function deleteCourse(formData: FormData) {
  const id = formData.get('id') as string
  if (!id) return
  await prisma.course.delete({ where: { id } })
}
