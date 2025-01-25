import { axiosInstance, API } from "../utils/config";

export const fetchUsers = async () => {
  const { data } = await axiosInstance.get(API.LOGIN());
  return data;
};

export const createUser = async (userData: unknown) => {
  const { data } = await axiosInstance.post(API.SIGNUP(), userData);
  return data;
};


