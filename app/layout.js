import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: "Snapwalls - Ultra HD Wallpapers",
  description:
    "We'll provide you with the best wallpapers for your different devices.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <Navbar />
          <div>
              {children}
          </div>
      </body>
    </html>
  );
}