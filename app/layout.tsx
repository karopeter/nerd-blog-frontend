import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "sonner";
import Providers from "@/Provider/Providers";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Nerd Blog Explorer',
  description: 'A Nerd Blog Post Viewer',
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
   return (
     <html lang="en">
       <body className={inter.className}>
         <Providers>{children}</Providers>
         <Toaster position="top-right" richColors expand={true} />
       </body>
     </html>
   )
}