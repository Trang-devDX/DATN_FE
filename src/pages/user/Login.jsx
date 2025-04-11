import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/AuthService";
import { getUserFromToken } from "../../services/UserService";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import { Input} from "antd";
export default function Login() {
    const {auth, setAuth} = useAuth();
    const {fetchCart, fetchNumberOfCart} = useCart();
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if(userName.trim().length === 0 && password.trim().length === 0) {
            setError('Please enter a username or password');
            return;
        }
        try {
            const response = await login(userName, password);
            if(response && response.result){
                localStorage.setItem('access_token', response.result.acceess_token);
                localStorage.setItem('refresh_token', response.result.refresh_token);

                const res = await getUserFromToken();
                if(res.code === 0){
                    setAuth({user: res.result});
                }
                setUsername('');
                setPassword('');
                if(res.result.role === "ADMIN"){
                    navigate('/admin');
                }else{
                    navigate('/userprofile');
                    // fetchCart();
                    // fetchNumberOfCart();
                }
            }
        } catch (error) {
            setError("Incorrect username or password");
        }
    }
    return(
        <div className="max-w-[1200px] mx-auto">
            <Input placeholder="Username" value={userName} onChange={e => setUsername(e.target.value)} />
            <Input.Password placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
    )
}