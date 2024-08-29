import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/app/dashboard/_components/Header";

const inter = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "AI mock interview",
  description: "made by rehan",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header /> {/* Add the Header component here */}
          <main > {/* Add padding-top to account for fixed header */}
            {children}
          </main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
