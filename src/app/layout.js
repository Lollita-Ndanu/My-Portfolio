import { Archivo_Black, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-heavy",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Lollita Ndanu | Full Stack Developer and System Analyst",
  description: "Portfolio for Lollita Ndanu, a full stack developer and system analyst based in Nairobi, Kenya.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} ${archivoBlack.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
