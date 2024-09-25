import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import Navbar from "../components/Navbar";
import "@/app/styles/navbar.css";
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
        {children}
      </body>
    </html>
  );
}
