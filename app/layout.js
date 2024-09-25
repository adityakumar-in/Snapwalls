import './globals.css';
import SideBar from '@/components/SideBar';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Snapwalls - Ultra HD Wallpapers",
  description:
    "We'll provide you with the best wallpapers for your different devices.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className='snapwalls-container'>
          <div className='snapwalls-sidebar'>
            <SideBar />
          </div>
          <div className='snapwalls-content'>
            <Navbar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
