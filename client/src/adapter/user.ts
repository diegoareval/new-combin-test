import { LoginResponse } from "../models/user";

export const authAdapter = (loginData: LoginResponse, userName: string) => {
  return {
    ...loginData,
    token: `Bearer ${loginData.token}`,
    userName,
  };
};
