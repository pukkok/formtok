import PageSwitcher from "@/A-Components/PageSwitch/PageSwitcher";
import "./index.css"
import { Toaster } from "sonner";

export const metadata = {
  title: "폼톡"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PageSwitcher />
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}