import { useEffect, useState } from "react";
import LocalStorageAuth from "../helpers/localStorageAuth";
import { UserAuth } from "../models/user";

const useLogin = () => {
  const [userAuth, setUserAuth] = useState<UserAuth>();

  useEffect(() => {
    const user = LocalStorageAuth.getAuth();
    if (user?.token) {
      setUserAuth(user);
    }
  }, []);

  return { userAuth };
};

export default useLogin;
