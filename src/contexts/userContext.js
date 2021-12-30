import { createContext } from "react";

const UserContext = createContext({ isLogin: false, user: { email: "", id: -1, nickname: "", profilepic: { "50px": "", "256px": "", o: "" }, is_staff: false }, token: "", setUser: () => {} });

export default UserContext;
