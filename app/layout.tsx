import "./globals.css";
import { TITLE, PROMISE } from '../lib/product';

export const metadata = {
  title: TITLE,
  description: PROMISE,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
