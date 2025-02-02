import { getAttendances, postAttendance } from "@/services/statsService"
import { GuestInfo } from "@/types/GuestType";
import { useMutation, useQuery } from "@tanstack/react-query"

export const useGetAttendances = () => {
    return useQuery({
        queryKey: ['attendances'],
        queryFn: getAttendances,
    });
};

export const usePostAttendance = (guestInfo: GuestInfo) => {
    return useMutation({
        mutationFn: () => postAttendance(guestInfo),
    });
};