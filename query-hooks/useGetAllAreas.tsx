import { fetchBase } from '@/Apis/fetch';
import { useQuery } from '@tanstack/react-query';

const fetchAllAreas = async () => {
  try {
    const response = await fetchBase({
      endpoint: 'area',
      method: 'GET'
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const useGetAllAreas = () =>
  useQuery<Array<AreasResponse>>({
    queryKey: ['allAreas'],
    queryFn: fetchAllAreas,
    staleTime: 60 * 1000 * 60
  });
