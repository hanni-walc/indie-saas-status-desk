import "./globals.css";

export const metadata = {
  title: "Money-Making Project",
  description: "A polished product-ready SaaS starter.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
