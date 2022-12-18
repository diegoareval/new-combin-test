import axios from "axios";
import { Member } from "../models/member";
import { ApiError } from "../models/user";

class memberService {
  static async getMembers(): Promise<Member[] | ApiError> {
    try {
      const response = await axios.get<Member[]>("/api/members");
      return response.data;
    } catch (error) {
      return {
        error: "Error, When obtaining the members",
      };
    }
  }

  static async saveMember(member: Member): Promise<Member | ApiError> {
    try {
      const response = await axios.post<Member>("/api/members", {
        ...member,
      });
      return response.data;
    } catch (error) {
      return {
        error: "Error, By keeping the new member",
      };
    }
  }
}

export default memberService;
