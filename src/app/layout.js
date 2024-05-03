import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AWS API Speetest for Python, Go and Node.js",
  description: "This is a test for serverless API's using AWS Lambda. It will count the number of words and letters. Then it will create two sorted arrays, one for words and one for letters. It will also count the number of each letter in the text. There are three different API Routes. Python, Go and Node.js . The execution time will be displayed for each API. If you want to check if the response is the same you can click for more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
