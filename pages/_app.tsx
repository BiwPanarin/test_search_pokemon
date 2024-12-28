import { ApolloProvider } from '@apollo/client';
import client from '../lib/apollo-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProps } from 'next/app';
// import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}