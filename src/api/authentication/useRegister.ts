import axios from "@/lib/axios.config";

export const register = async (newUser: any) => {
  //change any to register schema
  const { data } = await axios.post(`/user/register`, newUser);
  return data;
};
