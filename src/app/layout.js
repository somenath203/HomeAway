import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import Navbar from "./_components/navbar/Navbar";
import Provider from "./Provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Home Away",
  description: "an online hotel booking website",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>

      <html lang="en" suppressHydrationWarning>

        <body className={inter.className}>

          <Provider>

            <Navbar />

            <main className="container py-10">
              {children}
            </main>

          </Provider>

        </body>

      </html>
      
    </ClerkProvider>
  );
}
