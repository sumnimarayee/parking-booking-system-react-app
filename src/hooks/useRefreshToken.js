import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth, auth } = useAuth();
  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      return {
        ...prev,
        accessToken: response.data.accessToken,
        role: response.data.role,
        id: response.data.id,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
