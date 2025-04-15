import {
  getAttendances,
  getStats,
  postAttendance,
} from '@/services/statsService';
import { GuestInfo } from '@/types/GuestType';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from '@tanstack/react-query';

export const useGetStats = () => {
  return useQuery({
    queryKey: ['stats'],
    queryFn: () => getStats(),
  });
};

export const useGetAttendances = (page: number, size: number) => {
  return useQuery({
    queryKey: ['attendances'],
    queryFn: () => getAttendances(page, size),
  });
};

export const usePostAttendance = (
  guestInfo: GuestInfo,
  options?: UseMutationOptions,
) => {
  return useMutation({
    mutationFn: () => postAttendance(guestInfo),
    ...options,
  });
};
