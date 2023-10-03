import "./globals.css";
import { Inter } from "next/font/google";
import Provider from "../../context/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "travu",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
        <body className={`bg-white ${inter.className}`}>{children}</body>
      </Provider>
    </html>
  );
}
