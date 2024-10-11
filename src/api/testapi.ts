import axios from "@/lib/axios.config";

const testApi = async () => {
  try {
    const { data } = await axios.get(`/test`);
    console.log(data);    
    return data;    
  } catch (error) {
    console.log(error);    
  }
}