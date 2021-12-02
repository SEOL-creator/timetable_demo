import { createContext } from "react";

const UserContext = createContext({ isLogin: false, user: { email: "", id: -1, nickname: "", profilePic: { "50px": "", "256px": "", o: "" } }, token: "", setUser: () => {} });

export default UserContext;
