import './globals.css';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '/context/AuthContext';

export const metadata = {
  title: "Snapwalls - Ultra HD Wallpapers",
  description:
    "We'll provide you with the best wallpapers for your different devices.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <div>
            {children}
          </div>
          <script type="module" dangerouslySetInnerHTML={{
            __html: `
              import { initScrollbar } from '/app/scripts/scrollbar.js';
              document.addEventListener('DOMContentLoaded', initScrollbar);
            `
          }} />
        </AuthProvider>
      </body>
    </html>
  );
}