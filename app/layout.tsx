import "./globals.css"; // Crucial for Tailwind to work

export const metadata = {
  title: 'Medha Bhardwaj',
  description: 'Interactive OS Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* We remove all background classes here so page.tsx controls the screen */}
      <body className="m-0 p-0 antialiased">
        {children}
      </body>
    </html>
  )
}