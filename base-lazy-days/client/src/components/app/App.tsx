import { ReactElement } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { theme } from '../../theme';

import { Loading } from './Loading';
import { Navbar } from './Navbar';
import { Routes } from './Routes';

const queryClient = new QueryClient();

export function App(): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Navbar />
        <Loading />
        <Routes />
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
