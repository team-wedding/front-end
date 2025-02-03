export interface GuestInfo {
    id?: number;
    userId?: number | null;
    invitationId?: number;
    name: string;
    contact: string;
    isDining: '예정' | '안함' | '미정';
    attendance: boolean;
    isGroomSide: boolean;
    isBrideSide: boolean;
    companions: number;
}