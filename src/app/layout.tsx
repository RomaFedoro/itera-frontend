import Layout from '@/container/Layout';
import './globals.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head />
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

