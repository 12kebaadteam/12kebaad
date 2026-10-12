import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login | 12kebaad",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
