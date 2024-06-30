import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'JonWik Game',
  description: 'JonWikGame',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${inter.variable} scroll-smooth antialiased dark`}
    >
      <body className='text-gray-300 h-dvh'>
        <div className='h-full bg-gradient-to-t from-black to-rose-950'>
          {children}
        </div>
      </body>
    </html>
  );
}
