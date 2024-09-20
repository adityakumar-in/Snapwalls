import './globals.css';

export const metadata = {
  title: "Snapwalls - Ultra HD Wallpapers",
  description: "We'll provide you with the best wallpapers for your different devices.",
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
