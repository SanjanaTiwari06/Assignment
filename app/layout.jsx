import "./globals.css"; // Sabse zaruri line Tailwind ke liye

export const metadata = {
  title: "My Secure App",
  description: "Next.js Authentication Assignment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Ye children wo hain jo login ya dashboard se aayenge */}
        {children}
      </body>
    </html>
  );
}