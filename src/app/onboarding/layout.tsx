import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Onboarding | 12kebaad",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
