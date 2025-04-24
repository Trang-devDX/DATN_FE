import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import {
    SearchOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    ProfileOutlined,
    LogoutOutlined
} from "@ant-design/icons";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";
import { formatCurrency } from "../utils/FormatCurrency";

export default function Header() {
    const { numberOfCart, carts, updateNumberOfCart, setCarts } = useCart();
    const { auth, logout } = useAuth();

    const navigate = useNavigate();

    const [isCartVisible, setIsCartVisible] = useState(false);
    const [isUserVisible, setIsUserVisible] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(carts);
    }, [carts])

    const toggleCart = () => {
        setIsCartVisible(!isCartVisible);
    }
    const toggleUser = () => {
        setIsUserVisible(!isUserVisible);
    }
    const handleOverlayClick = () => {
        setIsCartVisible(false);
        setIsUserVisible(false);
    }
    const handleLoginRedirect = () => {
        navigate("/login");
        setIsCartVisible(false);
        setIsUserVisible(false);
    }
    const handleRegisterRedirect = () => {
        navigate("/register");
        setIsCartVisible(false);
        setIsUserVisible(false);
    }
    const handleUserProfileRedirect = () => {
        navigate("/userprofile");
        setIsCartVisible(false);
        setIsUserVisible(false);
    }
    const handleLogout = () => {
        logout();
        setIsCartVisible(false);
        setIsUserVisible(false);
        updateNumberOfCart(0);
        setCarts([]);
        navigate("/");
    }
    const handleCartRedirect = () => {
        navigate("/cart");
        setIsCartVisible(false);
        setIsUserVisible(false);
    }
    const handleOrderRedirect = () => {
        navigate("/order");
        setIsCartVisible(false);
        setIsUserVisible(false);
    }

    return (
        <div className="w-[80%] mx-auto flex flex-wrap">
            <div className="w-[20%]">
                <img src={logo} alt="Logo" />
            </div>
            <div className="w-[45%] flex justify-center items-center">
                <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm"
                    prefix={<SearchOutlined />}
                    className="w-[80%] h-[50px] border-2 rounded-lg p-5"
                />
            </div>
            <div className="w-[20%] flex justify-center items-center">
                <p>Hotline: 012345678 | 0987654321</p>
            </div>
            <div className="w-[15%] flex items-center justify-end gap-5">
                <div className="relative">
                    <ShoppingCartOutlined className="text-2xl cursor-pointer" onClick={toggleCart} />
                    {numberOfCart > 0 && (
                        <div className="absolute top-1 left-4 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center transform -translate-y-3">
                            {numberOfCart}
                        </div>
                    )}
                    {isCartVisible && (
                        <div className="">
                            <div className="cart-overlay fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-10" onClick={handleOverlayClick} />
                            {
                                auth.user ? (
                                    <div className="absolute top-full right-0 mt-2 w-[350px] bg-white shadow-lg rounded-xl p-4 z-50">
                                        <div className="text-lg text-center mb-2">🛒 Giỏ hàng.</div>
                                        <div className="max-h-[250px] overflow-y-auto scroll-hidden text-sm text-left mb-5">
                                            {
                                                products.length > 0 ? (
                                                    <div className="gap-4">
                                                        {
                                                            products.map((product, index) => (
                                                                <div key={product.id_cart} className="flex items-center mb-2">
                                                                    <div className="w-[75px] h-[55px]">
                                                                        <img
                                                                            src={product.image}
                                                                            alt={product.product_name}
                                                                            className="object-cover w-full h-full"
                                                                        />
                                                                    </div>
                                                                    <div className="ml-[10px] flex justify-between w-full">
                                                                        <div className="mr-[10px]">
                                                                            <p className="font-medium">
                                                                                {product.product_name}
                                                                            </p>
                                                                            <p>x{product.quantity}</p>
                                                                        </div>
                                                                        <div className="mr-[10px] text-red-500">
                                                                            {formatCurrency(
                                                                                product.quantity * product.unit_price,
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                ) : (
                                                    <div className="">Hiện chưa có sản phẩm nào trong giỏ hàng</div>
                                                )
                                            }
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 text-lg text-center">
                                            <button className="w-[150px] h-[50px] text-base bg-green-500 rounded border-white border hover:opacity-[0.9]" onClick={handleCartRedirect}>Chỉnh sửa giỏ hàng</button>
                                            <button className="w-[150px] h-[50px] text-base bg-white rounded border-green-500 border hover:opacity-[0.9]" onClick={handleOrderRedirect}>Thanh toán</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="absolute top-full right-0 mt-2 w-[350px] bg-white shadow-lg rounded-xl p-4 z-50">
                                        <div className="max-h-[250px] text-lg text-center mb-5">Vui lòng đăng nhập để xem giỏ hàng.</div>
                                        <div className="grid grid-cols-2 gap-4 text-lg text-center">
                                            <button className="w-[150px] h-[50px] text-base bg-green-500 rounded border-white border hover:opacity-[0.9]" onClick={handleLoginRedirect}>Đăng nhập</button>
                                            <button className="w-[150px] h-[50px] text-base bg-white rounded border-green-500 border hover:opacity-[0.9]" onClick={handleRegisterRedirect}>Đăng kí</button>
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    )}
                </div>
                <div className="relative">
                    <UserOutlined className="text-2xl" onClick={toggleUser} />
                    {isUserVisible && (
                        <div className="">
                            <div className="cart-overlay fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-10" onClick={handleOverlayClick} />
                            {
                                auth.user ? (
                                    <div className="absolute top-full right-0 mt-2 w-[200px] bg-white shadow-lg rounded-xl p-4 z-50 grid grid-row-2 gap-4 text-lg text-center text-base">
                                        <div className="flex cursor-pointer" onClick={handleUserProfileRedirect}>
                                            <ProfileOutlined className="text-2xl mr-5" />
                                            <p>Hồ sơ cá nhân</p>
                                        </div>
                                        <div className="flex cursor-pointer" onClick={handleLogout}>
                                            <LogoutOutlined className="text-2xl mr-5" />
                                            <p>Đăng xuất</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="absolute top-full right-0 mt-2 w-[350px] bg-white shadow-lg rounded-xl p-4 z-50">
                                        <div className="grid grid-cols-2 gap-4 text-lg text-center">
                                            <button className="w-[150px] h-[50px] text-base bg-green-500 rounded border-white border hover:opacity-[0.9]" onClick={handleLoginRedirect}>Đăng nhập</button>
                                            <button className="w-[150px] h-[50px] text-base bg-white rounded border-green-500 border hover:opacity-[0.9]" onClick={handleRegisterRedirect}>Đăng kí</button>
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
