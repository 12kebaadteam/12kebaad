import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Career Decision Quiz | How It Works - 12kebaad',
  description: 'Take the specialized 12kebaad career decision quiz. Quick, scientific choice pairs to predict your optimal career pathways.',
  alternates: {
    canonical: 'https://12kebaad.in/quiz-intro',
  },
}

export default function QuizIntroLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
