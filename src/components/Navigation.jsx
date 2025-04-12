import React from "react";
import {
    HomeOutlined,
    UnorderedListOutlined,
    BookOutlined,
    UsergroupAddOutlined,
    ContactsOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useLocation } from "react-router-dom";
import "../assets/css/Navigation.css";

export default function Navigation() {
    const items = [
        {
            label: (
                <a href="/" className="no-underline hover:no-underline">
                    Trang chủ
                </a>
            ),
            key: "/",
            icon: <HomeOutlined />,
        },
        {
            label: (
                <a href="/product/1" className="no-underline hover:no-underline">
                    Danh mục sản phẩm
                </a>
            ),

            key: "product",
            icon: <UnorderedListOutlined />,
        },
        {
            label: (
                <a href="/guidepage" className="no-underline hover:no-underline">
                    Hướng dẫn
                </a>
            ),
            key: "guide",
            icon: <BookOutlined />,
        },
        {
            label: (
                <a href="/presentation" className="no-underline hover:no-underline">
                    Giới thiệu
                </a>
            ),
            key: "presentation",
            icon: <UsergroupAddOutlined />,
        },
        {
            label: (
                <a href="/contact" className="no-underline hover:no-underline">
                    Liên hệ
                </a>
            ),
            key: "contact",
            icon: <ContactsOutlined />,
        },
    ];
    const location = useLocation();
    return (
        <div className="w-full mt-3" style={{ backgroundColor: "#4CAF50" }}>
            <div className="w-[80%] mx-auto menu-wrapper">
                <Menu
                    selectedKeys={[location.pathname]}
                    mode="horizontal"
                    items={items}
                    className="flex justify-between w-full"
                    key={items.key}
                    style={{ 
                        backgroundColor: "#4CAF50",                                  
                    }}
                />
            </div>
        </div>
    );
}
