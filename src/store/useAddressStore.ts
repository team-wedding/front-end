import { create } from 'zustand';

type AddressState = {
  address: string;
  zonecode: string | number;
  coords: { lat: number; lng: number };
  weddingHallName: string;
  weddingHallDetail: string;
  setAddress: (address: string, zonecode: string | number) => void;
  setCoords: (lat: number, lng: number) => void;
};

const useAddressStore = create<AddressState>((set) => ({
  address: '',
  zonecode: '',
  weddingHallName: '',
  weddingHallDetail: '',
  coords: { lat: 37.5665, lng: 126.978 },
  setAddress: (address, zonecode) => set(() => ({ address, zonecode })),
  setCoords: (lat, lng) => set(() => ({ coords: { lat, lng } })),
}));

export default useAddressStore;
