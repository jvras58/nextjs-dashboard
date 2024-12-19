import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ui/theme-provider';

export const metadata: Metadata = {
  title: 'Login - Dashboard Betinha',
  description: 'cessar o painel da Betinha', 
};

export default function RootLayout({
    children
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="pt-BR">
        <body className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans antialiased">
          <div className="absolute top-4 right-4">
          </div>
          <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-2xl p-6 bg-white dark:bg-gray-800 shadow-lg rounded-md">
            <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
            </div>
          </div>
        </body>
      </html>
    );
  }
