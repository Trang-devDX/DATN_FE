import poster from '../assets/images/poster.png';

export default function Intro() {
    return (
        <div className="w-full h-[600px] grid grid-cols-2 bg-gray-300">
            <div className="space-y-10 mx-auto my-auto">
                <h1 className='text-3xl font-medium text-gray-800'>Welcome to</h1>
                <h1 className='text-5xl font-bold text-teal-500'>QUANGNAM FOOD</h1>
                <p className='text-2xl text-gray-700'>Khám phá những điều tuyệt vời nhất về ẩm thực Quảng Nam</p>
                <button className='w-[200px] h-[50px] bg-orange-500 rounded border-white border'>
                    Mua sắm nào!
                </button>
            </div>
            <div className="h-[600px] flex items-center justify-center">
                <img src={poster} alt="poster" className="h-full max-h-full w-auto max-w-full object-contain"/>
            </div>
        </div>
    );
}
