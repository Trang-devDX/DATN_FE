import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/AuthService";
import { getUserFromToken } from "../../services/UserService";
// import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import { Input} from "antd";
export default function Login() {
    const { setAuth } = useAuth();
    // const {fetchCart, fetchNumberOfCart} = useCart();
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if(userName.trim().length === 0 && password.trim().length === 0) {
            setError('Hãy nhập tên đăng nhập và mật khẩu');
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
            setError("Sai tên đăng nhập hoặc mật khẩu");
        }
    }
    return(
        <div className="max-w-[1200px] mx-auto">
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Đăng nhập
                            </h1>
                            <div className="space-y-4 md:space-y-6">
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Tên đăng nhập
                                    </label>
                                    <Input
                                        value={userName}
                                        type="username"
                                        name="username"
                                        id="username"
                                        className="w-full p-2.5"
                                        placeholder="Nhập tên đăng nhập của bạn"
                                        required=""
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Mật khẩu
                                    </label>
                                    <Input
                                        value={password}
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Mật khẩu"
                                        className="w-full p-2.5"
                                        required=""
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                {error && <div className="p-2 text-sm text-red-600 bg-red-100 rounded">{error}</div>}

                                <div className="flex items-center justify-between">
                                    <a
                                        href="forgotpassword1"
                                        className="text-sm font-medium text-primary-600 hover:no-underline dark:text-primary-500"
                                    >
                                        Quên mật khẩu?
                                    </a>
                                </div>
                                <button
                                    onClick={(e) => handleLogin(e)}
                                    className="w-full text-white bg-green-500 focus:outline-none hover:opacity-[0.9] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Đăng nhập
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Bạn chưa có tài khoản?{' '}
                                    <a
                                        href="/register"
                                        className="font-medium text-primary-600 hover:no-underline dark:text-primary-500"
                                    >
                                        Đăng ký
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}