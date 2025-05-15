import logo from '../../assets/images/logo.png';

export default function Contact() {
    return (
        <div className="w-[1200px] flex justify-between mx-auto py-4">
            <div className="w-[575px] space-y-4">
                <h1 className="text-2xl font-medium uppercase">Nơi giải đáp toàn bộ thắc mắc của bạn</h1>
                <h3 className="font-medium">
                    Email: <span className="text-orange-500">dacsanquangnam@gmail.com</span>
                </h3>
                <h3 className="font-medium">
                    Hotline: <span className="text-orange-500">0911.85.8888 | 0977.33.7979</span>
                </h3>
                <h3 className="font-medium">Liên hệ với chúng tôi</h3>
                <div className="flex justify-between">
                    <input
                        type="text"
                        placeholder="Họ và tên"
                        className="border border-gray-300 rounded h-[40px] pl-3 w-[47%]"
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        className="border border-gray-300 rounded h-[40px] pl-3 w-[47%]"
                    />
                </div>
                <input
                    type="text"
                    placeholder="Điện thoại"
                    className="border border-gray-300 rounded h-[40px] pl-3 w-[100%]"
                />
                <textarea
                    name=""
                    id=""
                    placeholder="Nhập nội dung tại đây"
                    className="w-full h-[120px] border border-gray-300 rounded-lg p-3"
                />
                <button className="bg-black text-white rounded w-[47%] h-[40px]">Gửi thông tin</button>
            </div>
            <div className="w-[575px] space-y-3">
                <div class="h-[150px]">
                    <img src={logo} alt="address" class="w-full h-full object-cover" />
                </div>
                <div className="space-y-5 font">
                    <h1 className="text-2xl font-medium uppercase">Các cơ sở của chúng tôi</h1>
                    <div className="">
                        <h3 className="font-medium">1. QuangNamFood Đà Nẵng</h3>
                        <p>54 Nguyễn Lương Bằng, phường Hòa Khánh Bắc, quận Liên Chiểu, TP Đà Nẵng</p>
                    </div>
                    <div className="">
                        <h3 className="font-medium">2. QuangNamFood Huế</h3>
                        <p>63 Phùng Hưng, Thuận Thành, Huế, Thừa Thiên Huế</p>
                    </div>
                    <div className="">
                        <h3 className="font-medium">3. QuangNamFood TP Hồ Chí Minh</h3>
                        <p>78 Quang Trung, Phước Long B, Quận 9, TP Hồ Chí Minh</p>
                    </div>
                </div>
            </div>
        </div>
    );
}