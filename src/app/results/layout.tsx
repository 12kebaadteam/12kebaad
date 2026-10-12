import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Career Results | 12kebaad",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
