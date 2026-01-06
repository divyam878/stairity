// import { Bricolage_Grotesque } from "next/font/google";
import { Parkinsans } from "next/font/google";
import {Fuzzy_Bubbles} from "next/font/google";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import TawkToChat from "../components/chat/TawkToChat";
import { CTAProvider } from "../components/providers/CTAProvider";

const parkinsans = Parkinsans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

// const helloAmerica = localFont({
//   src: "../../public/fonts/HelloAmerica.otf",
//   variable: "--font-hello-america",
//   display: "swap",
// });
  
const fuzzyBubbles = Fuzzy_Bubbles({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-hello-america",
});

export const metadata = {
  title: "Webestrix",
  description: "Your SEO Partner",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${parkinsans.variable} ${fuzzyBubbles.variable} font-poppins antialiased`}
        >
          <CTAProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <TawkToChat />
          </CTAProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
