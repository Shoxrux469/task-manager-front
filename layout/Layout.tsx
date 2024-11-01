// components/Layout.tsx

import { ReactNode } from "react";
import { useRouter } from "next/router";
import Header from "@/components/header/Header";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  const showHeader =
    router.pathname !== "/signup" && router.pathname !== "/login";

  return (
    <div>
      {showHeader && <Header />}
      <main>{children}</main>
      <Toaster />
    </div>
  );
};

export default Layout;
