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
};

const useAddressStore = create<AddressState>((set) => ({
  address: '',
  jibunAddress: '',
  zonecode: '',
  weddingHallName: '',
  weddingHallDetail: '',
  coords: { lat: 37.5665, lng: 126.978 },
  setAddress: (address, zonecode) => set(() => ({ address, zonecode })),
  setJibunAddress: (jibunAddress) => set(() => ({ jibunAddress })),
  setCoords: (lat, lng) => set(() => ({ coords: { lat, lng } })),
}));

export default useAddressStore;
