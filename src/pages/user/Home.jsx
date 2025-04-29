import Intro from "../../components/Intro";
// import ListProduct from "../../components/ListProduct";
// import Slider from "../../components/Slider";
// import { useNavigate } from "react-router-dom";

export default function Home() {
    // const navigate = useNavigate();
    // const toLoginPage = () => {
    //     navigate('/login');
    // }
    return (

        <div>
            {/* <button onClick={toLoginPage}>toi trang dang nhap</button> */}
            <Intro></Intro>
            {/* <Slider></Slider>
            <ListProduct></ListProduct> */}
        </div>
    );
}
