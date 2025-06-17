import PageSwitcher from "@/components/page-switch/PageSwitcher";
import "./index.css"
import { Toaster } from "sonner";
import ThemeObserver from "./ThemeObserver";

export const metadata = {
  title: "폼톡"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeObserver>
          <PageSwitcher />
          {children}
          <Toaster richColors position="top-center" />
        </ThemeObserver>
      </body>
    </html>
  )
}