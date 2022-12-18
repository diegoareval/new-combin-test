import axios from "axios";
import { authAdapter } from "../adapter/user";
import { ApiError, LoginForm, LoginResponse, UserAuth } from "../models/user";

class UserService {
  static async login(data: LoginForm): Promise<UserAuth | ApiError> {
    try {
      const response = await axios.post<LoginResponse>("/auth", {
        username: data.userName,
        password: data.password,
        disableAuthorization: true,
      });

      if (response.data?.token) {
        return authAdapter(response.data, data.userName);
      }

      throw new Error("Error when making at the login");
    } catch (error) {
      return {
        error: "Error, Invalida Credentials",
      };
    }
  }
}

export default UserService;
