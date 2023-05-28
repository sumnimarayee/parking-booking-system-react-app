import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { messaging } from "../utils/Firebase";
import { getToken } from "firebase/messaging";
import useAxiosprivate from "../hooks/useAxiosPrivate";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const axios = useAxiosprivate();
  const { auth } = useAuth();
  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BMzSbLMefqT14WVwIcThSAjSQUxt11QFwCoTB20LG5oHnC4yy6-IhYqUcguaA_2YPTBzEjikraBZB_ZzeWF4mS8",
      });
      const payload = {
        notificationToken: token,
      };
      await axios.patch(`/notifications/${auth.id}`, payload);
    }
  }
  useEffect(() => {
    requestPermission();
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return <>{isLoading ? <p>add spinner here</p> : <Outlet />}</>;
};

export default PersistLogin;
