import { createContext } from "react";

const UserContext = createContext({ isLogin: false, user: { email: "", nickname: "" }, token: "", setUser: () => {} });

export default UserContext;
