'use server'

import { redirect } from 'next/navigation'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from '@/lib/prisma'

async function checkAdmin() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/admin')
  }
  return session
}

// ── CSV helpers ───────────────────────────────────────────────────────────────
/** Parse a CSV line properly, handling quoted fields with commas */
function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++ }
      else inQuotes = !inQuotes
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += ch
    }
  }
  result.push(current.trim())
  return result
}

// ── Colleges+Courses CSV ──────────────────────────────────────────────────────
export async function uploadCSV(formData: FormData) {
  await checkAdmin()
  const file = formData.get('csv') as File
  if (!file) return
  const text = await file.text()
  const rows = text.split('\n')
  for (let i = 1; i < rows.length; i++) {
    const cols = parseCSVLine(rows[i])
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
    const sanitizedFee = fee.trim().replace(/\s*\(\s*Full Year\s*\)|\s*\(\s*Semester\s*\)|\/\s*Semester|\/\s*Year/gi, '').trim() || 'Not Specified'
    if (link) {
      await prisma.collegeCourse.update({ where: { id: link.id }, data: { fee: sanitizedFee, timeInvolved: timeInvolved.trim() || 'Not Specified', remarks: remarks.trim() || null } })
    } else {
      await prisma.collegeCourse.create({ data: { collegeId: college.id, courseId: course.id, fee: sanitizedFee, timeInvolved: timeInvolved.trim() || 'Not Specified', remarks: remarks.trim() || null } })
    }
  }
  redirect('/admin')
}

// ── Entrance Tests CSV ────────────────────────────────────────────────────────
export async function uploadTestsCSV(formData: FormData) {
  await checkAdmin()
  const file = formData.get('testsCsv') as File
  if (!file) return
  const text = await file.text()
  const rows = text.split('\n')
  for (let i = 1; i < rows.length; i++) {
    const cols = parseCSVLine(rows[i])
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
  await checkAdmin()
  const collegeId = formData.get('collegeId') as string
  const adminRank = parseInt(formData.get('adminRank') as string)
  const targetStream = (formData.get('targetStream') as string) || null
  const reason = (formData.get('reason') as string) || null
  if (!collegeId || isNaN(adminRank)) return
  const existing = await prisma.recommendation.findFirst({ where: { collegeId, targetStream } })
  if (existing) {
    await prisma.recommendation.update({ where: { id: existing.id }, data: { adminRank, reason } })
  } else {
    await prisma.recommendation.create({ data: { collegeId, adminRank, targetStream, reason } })
  }
  redirect('/admin')
}

export async function deleteRecommendation(formData: FormData) {
  await checkAdmin()
  const id = formData.get('id') as string
  if (!id) return
  await prisma.recommendation.delete({ where: { id } })
  redirect('/admin')
}

export async function updateCourse(formData: FormData) {
  await checkAdmin()
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const stream = formData.get('stream') as string
  if (!id || !title || !stream) return
  await prisma.course.update({ where: { id }, data: { title: title.trim(), stream } })
}

export async function deleteCourse(formData: FormData) {
  await checkAdmin()
  const id = formData.get('id') as string
  if (!id) return
  await prisma.course.delete({ where: { id } })
}

// ── Delete by State (with 2FA) ────────────────────────────────────────────────
export async function deleteCollegesByState(formData: FormData) {
  await checkAdmin()
  const state = formData.get('state') as string
  const confirm = formData.get('confirm') as string
  const verifyPassword = formData.get('verifyPassword') as string

  const admin1Pass = process.env.ADMIN1_PASSWORD
  const admin2Pass = process.env.ADMIN2_PASSWORD

  if (!state || confirm !== `DELETE ${state}` || (verifyPassword !== admin1Pass && verifyPassword !== admin2Pass)) {
    redirect('/admin?deleteError=1')
  }

  await prisma.college.deleteMany({ where: { state } })
  redirect('/admin?deleteSuccess=1')
}

export async function deleteEntranceTest(formData: FormData) {
  await checkAdmin()
  const id = formData.get('id') as string
  if (!id) return
  await prisma.entranceTest.delete({ where: { id } })
  redirect('/admin')
}

// ── Professional Courses CSV ──────────────────────────────────────────────────
export async function uploadProfessionalCSV(formData: FormData) {
  await checkAdmin()
  const file = formData.get('profCsv') as File
  if (!file) return
  const text = await file.text()
  const rows = text.split('\n')
  for (let i = 1; i < rows.length; i++) {
    const cols = parseCSVLine(rows[i])
    if (cols.length < 2) continue
    const [name = '', fullForm = '', eligibility = '', fees = '', duration = '', opportunities = '', extraRemarks = ''] = cols
    const safeName = name.trim()
    if (!safeName) continue
    const safeFee = fees.trim().replace(/\s*\(\s*Full Year\s*\)|\s*\(\s*Semester\s*\)|\/\s*Semester|\/\s*Year/gi, '').trim() || 'Not Specified'
    await prisma.professionalCourse.upsert({
      where: { name: safeName },
      update: { fullForm: fullForm.trim(), eligibility: eligibility.trim(), fees: safeFee, duration: duration.trim(), opportunities: opportunities.trim(), extraRemarks: extraRemarks.trim() || null },
      create: { name: safeName, fullForm: fullForm.trim(), eligibility: eligibility.trim(), fees: safeFee, duration: duration.trim(), opportunities: opportunities.trim(), extraRemarks: extraRemarks.trim() || null }
    })
  }
  redirect('/admin')
}

export async function deleteProfessionalCourse(formData: FormData) {
  await checkAdmin()
  const id = formData.get('id') as string
  if (!id) return
  await prisma.professionalCourse.delete({ where: { id } })
  redirect('/admin')
}

// ── Q&A Actions ───────────────────────────────────────────────────────────────
export async function answerQuestion(formData: FormData) {
  await checkAdmin()
  const id = formData.get('id') as string
  const answer = (formData.get('answer') as string)?.trim()
  if (!id || !answer) return
  await prisma.question.update({
    where: { id },
    data: { answer, isAnswered: true, answeredAt: new Date() }
  })
  redirect('/admin?tab=questions')
}

export async function deleteQuestion(formData: FormData) {
  await checkAdmin()
  const id = formData.get('id') as string
  if (!id) return
  await prisma.question.delete({ where: { id } })
  redirect('/admin?tab=questions')
}

export async function deleteAllProfessionalCourses() {
  await checkAdmin()
  await prisma.professionalCourse.deleteMany({})
  redirect('/admin?tab=prof')
}

export async function deleteAllEntranceTests() {
  await checkAdmin()
  await prisma.entranceTest.deleteMany({})
  redirect('/admin?tab=tests')
}
