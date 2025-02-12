// app/layout.js
import '../styles/globals.css'
import { ThemeProvider } from "next-themes";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'E-Commerce App',
  description: 'Website e-commerce tanpa checkout/pembayaran',
}

export default function RootLayout({ children }) {
  return (
    // Menambahkan suppressHydrationWarning di sini
    <html lang="id" suppressHydrationWarning>
      <body className="bg-[var(--color-background)]">
        <ThemeProvider attribute="class" defaultTheme="light">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
