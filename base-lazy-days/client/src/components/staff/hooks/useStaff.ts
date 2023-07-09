import { Dispatch, SetStateAction, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { axiosInstance } from '@/axiosInstance';
import { filterByTreatment } from '@/components/staff/utils';
import { queryKeys } from '@/react-query/constants';

import type { Staff } from '../../../../../shared/types';

// for when we need a query function for useQuery
async function getStaff(filter): Promise<Staff[]> {
  const notData = [];
  const { data = notData } = await axiosInstance.get('/staff');

  if (filter !== 'all') {
    return filterByTreatment(data, filter);
  } else return data;
}

interface UseStaff {
  staff: Staff[];
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

export function useStaff(): UseStaff {
  const [filter, setFilter] = useState('all');

  const fallback = [];
  const { data: staff = fallback } = useQuery({
    queryKey: [queryKeys.staff, filter],
    queryFn: () => getStaff(filter),
    meta: {
      errorMessage: 'error connection to the server (staff)',
    },
  });

  return { staff, filter, setFilter };
}
