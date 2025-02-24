// _app.tsx
import '@/styles/globals.css';
import Layout from '../components/Layout';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const isLoggedIn = true; // یا از localStorage یا state مدیریت کنید

  return (
    <Layout isLoggedIn={isLoggedIn}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;