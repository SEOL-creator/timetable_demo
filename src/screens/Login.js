import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import UserContext from "../contexts/userContext";
import axiosInstance from "../utils/axiosInstance";

export default function Login({ history }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
        axiosInstance
            .post("/apis/token/", { email: email, password: password })
            .then((response) => {
                if (response.status === 200) {
                    const data = response.data;
                    setUser({ isLogin: true, user: { email: data.email, nickname: data.nickname }, token: data.token });
                    navigate("/");
                } else {
                    setLoading(false);
                    setError("Invalid email or password");
                }
            })
            .catch((error) => {
                setLoading(false);
                console.log(error.response);
                if (error.response.status === 400) {
                    setError("Invalid email or password");
                } else {
                    console.log(error.response.data);
                }
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <div>{error}</div>
                <input type="submit" value={loading ? "Loading..." : "Login"} />
            </form>
        </div>
    );
}
