import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal | 12kebaad",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session || (session as any).user?.role !== "admin") {
    redirect("/admin-login");
  }

  return <>{children}</>;
}
