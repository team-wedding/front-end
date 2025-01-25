import { create } from 'zustand';

type AddressState = {
  address: string;
  jibunAddress: string;
  zonecode: string | number;
  coords: { lat: number; lng: number };
  weddingHallName: string;
  weddingHallDetail: string;
  setAddress: (address: string, zonecode: string | number) => void;
  setJibunAddress: (jibunAddress: string) => void;
  setCoords: (lat: number, lng: number) => void;
  reset: () => void; // Reset 메서드 추가
  setWeddingHallName: (weddingHallName: string) => void;
  setWeddingHallDetail: (weddingHallDetail: string) => void;
};

// 초기 상태 정의
const initialState = {
  address: '',
  jibunAddress: '',
  zonecode: '',
  weddingHallName: '',
  weddingHallDetail: '',
  coords: { lat: 37.5086, lng: 127.0397 },
};

const useAddressStore = create<AddressState>((set) => ({
  ...initialState,
  setAddress: (address, zonecode) => set(() => ({ address, zonecode })),
  setJibunAddress: (jibunAddress) => set(() => ({ jibunAddress })),
  setCoords: (lat, lng) => set(() => ({ coords: { lat, lng } })),
  reset: () => set(() => initialState), // Reset 메서드 구현
  setWeddingHallName: (weddingHallName) => set(() => ({ weddingHallName })),
  setWeddingHallDetail: (weddingHallDetail) =>
    set(() => ({ weddingHallDetail })),
}));

export default useAddressStore;
