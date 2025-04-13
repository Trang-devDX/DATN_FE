import React, { useState, useEffect } from "react";
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

export default function Header() {
    const { numberOfCart, carts, updateNumberOfCart, setCarts } = useCart();
    const { auth, logout } = useAuth();

    const [isCartVisible, setIsCartVisible] = useState(false);
    const [isUserVisible, setIsUserVisible] = useState(false);

    const toggleCart = () => {
        setIsCartVisible(!isCartVisible);
    }
    const toggleUser = () => {
        setIsUserVisible(!isUserVisible);
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
                <p>Hotline: 0123456789 | 0987654321</p>
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
                        <div className="absolute top-full right-0 mt-2 w-[250px] bg-white shadow-lg rounded-xl p-4 z-50">
                            <div className="text-sm">🛒 Giỏ hàng của bạn đang trống.</div>
                        </div>
                    )}
                </div>
                <div className="relative">
                    <UserOutlined className="text-2xl" onClick={toggleUser}/>
                    {isUserVisible && (
                        <div className="absolute top-full right-0 mt-2 w-[250px] bg-white shadow-lg rounded-xl p-4 z-50">
                            <div className="text-sm">User</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
