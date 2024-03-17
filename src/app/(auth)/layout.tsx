import { ReactNode } from "react";

import Logo from "@/components/logo";
import ThemeSwitcher from "@/components/theme-switcher";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({
  children
}: AuthLayoutProps) => {
  return (
    <div
      className="flex flex-col min-h-screen min-w-full bg-background max-h-screen"
    >
      <nav
        className="flex items-center justify-between border-b border-border h-[60px] px-4 py-2"
      >
        <Logo />
        <ThemeSwitcher />
      </nav>
      <main
        className="flex items-center justify-center w-full h-full flex-grow"
      >
        {children}
      </main>
    </div>
  )
}

export default AuthLayout