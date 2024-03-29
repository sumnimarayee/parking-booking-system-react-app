import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    try {
      const response = await axios.post(
        "/logout",
        { headers: { "Content-Type": "application/json" } },
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return logout;
};

export default useLogout;
