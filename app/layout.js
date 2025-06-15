import "./index.css"

export const metadata = {
  title: "폼톡"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}