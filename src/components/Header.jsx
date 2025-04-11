import logo from '../assets/images/logo.png'
import { SearchOutlined, ShoppingCartOutlined, UserOutlined, ProfileOutlined, LogoutOutlined } from '@ant-design/icons';

export default function Header() {
    return (     
        <div className="w-[80%] mx-auto flex flex-wrap">
            <div className="w-[20%]">
                <img src={logo} alt="Logo" />
            </div>
            <div className="w-[45%] flex justify-center items-center">
                <input type="text" placeholder="Tìm kiếm sản phẩm" prefix={<SearchOutlined />} className='w-[80%] h-[50px] border-2 rounded-lg p-5'/>
            </div>
            <div className="w-[20%] flex justify-center items-center">
                <p>Hotline: 0123456789 | 0987654321</p>
            </div>
            <div className="w-[15%] flex items-center justify-end gap-5">
                <ShoppingCartOutlined className="text-2xl" />
                <UserOutlined className="text-2xl" />
            </div>
        </div>
     
    );
}
