import { useQuery } from '@tanstack/react-query';

import { axiosInstance } from '@/axiosInstance';
import { queryKeys } from '@/react-query/constants';

import type { Treatment } from '../../../../../shared/types';

async function getTreatments(): Promise<Treatment[]> {
  const { data } = await axiosInstance.get('/treatments');
  return data;
}

export function useTreatments(): Treatment[] {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.treatments],
    queryFn: getTreatments,
    meta: {
      errorMessage: 'error connection to the server (treatment)',
    },
  });

  return data;
}
