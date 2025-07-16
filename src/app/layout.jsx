import "./globals.css";

export const metadata = {
  title: "Bold Text Generator",
  description: "Bold text generator website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
