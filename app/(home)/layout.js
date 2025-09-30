import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import dbConnect from "@/service/mongo";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Stay Swift",
  description: "Stay Swift - Your Travel Companion",
};

export default async function RootLayout({ children }) {
  await dbConnect();

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Navbar sideMenu={true} />
        <main>{children}</main>
      </body>
    </html>
  );
}
