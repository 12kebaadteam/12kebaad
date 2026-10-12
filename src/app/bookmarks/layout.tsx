import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saved Bookmarks | 12kebaad",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BookmarksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
