import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Compare Careers After 12th | 12kebaad',
  description: 'Side-by-side career comparison tool. Compare salaries, entrance exam difficulty, work-from-home feasibility, and market demand.',
  alternates: {
    canonical: 'https://12kebaad.in/compare-careers',
  },
}

export default function CompareCareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
