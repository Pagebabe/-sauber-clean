import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from 'next-i18next';
import { Toaster } from 'react-hot-toast';
import { ConfirmDialogProvider } from '@/components/admin/ConfirmDialog';
import { ErrorBoundary } from '@/components/ErrorBoundary';

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ErrorBoundary>
      <SessionProvider session={session}>
        <ConfirmDialogProvider>
          <Component {...pageProps} />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              style: {
                background: '#10B981',
              },
              iconTheme: {
                primary: '#fff',
                secondary: '#10B981',
              },
            },
            error: {
              style: {
                background: '#EF4444',
              },
              iconTheme: {
                primary: '#fff',
                secondary: '#EF4444',
              },
            },
          }}
        />
      </ConfirmDialogProvider>
    </SessionProvider>
    </ErrorBoundary>
  );
}

export default appWithTranslation(App);
