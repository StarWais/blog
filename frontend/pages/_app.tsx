import '../styles/global.css';

import type { AppProps as NextAppProps } from 'next/app';
import { Box, ChakraProvider } from '@chakra-ui/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { wrapper } from '../redux/store';
import AuthProvider from '../components/Auth/AuthProvider';
import AuthGuard from '../components/Auth/AuthGuard';

type AppProps<P = any> = {
  pageProps: P;
} & Omit<NextAppProps<P>, 'pageProps'>;

export type PageProps = {
  requiresAuth?: boolean;
  admin?: boolean;
};

function MyApp({ Component, pageProps }: AppProps<PageProps>) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Header />
        <Box as="main" mb={8}>
          {Component.defaultProps?.requiresAuth ? (
            <AuthGuard admin={Component.defaultProps.admin || false}>
              <Component {...pageProps} />
            </AuthGuard>
          ) : (
            <Component {...pageProps} />
          )}
        </Box>
        <Footer />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default wrapper.withRedux(MyApp);
