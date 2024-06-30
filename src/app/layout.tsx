import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import LocalFont from 'next/font/local';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jonWikFont = LocalFont({
  src: '../assets/fonts/specialagentoutsemital.ttf',
  declarations: [{ prop: 'format', value: 'truetype' }],
  style: 'normal',
  weight: 'normal',
  variable: '--font-jonwik',
});

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
      className={`${inter.variable} ${jonWikFont.variable} scroll-smooth antialiased dark`}
    >
      <body className='text-gray-300 h-dvh'>
        <div className='h-full bg-gradient-to-t from-black to-rose-950'>
          {children}
        </div>
      </body>
    </html>
  );
}
