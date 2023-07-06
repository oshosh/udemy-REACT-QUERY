import { createStandaloneToast } from '@chakra-ui/react';
import { QueryCache, QueryClient } from '@tanstack/react-query';

import { theme } from '../theme';

const toast = createStandaloneToast({ theme });

function queryErrorHandler(error: unknown, metaMsg): void {
  const title = error instanceof Error ? error.message : metaMsg;
  toast.closeAll();
  toast({ title, status: 'error', variant: 'subtle', isClosable: true });
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta.errorMessage) {
        queryErrorHandler(error, query.meta.errorMessage);
      }
    },
  }),
});
