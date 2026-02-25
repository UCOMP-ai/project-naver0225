import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './extracted-tailwind.css';
import { Navigation } from '@/components/Navigation';

const fontSans = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Naver Corp B2B Renewal',
  description: `네이버는 기술과 연결로 비즈니스 가능성을 확장합니다. B2B 파트너에게는 신뢰할 수 있는 기술 플랫폼 기업으로서, 데이터 기반의 투명성과 혁신적 파트너십을 제공합니다.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${fontSans.className} antialiased`}>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
