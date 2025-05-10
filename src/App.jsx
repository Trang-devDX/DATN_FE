import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";

import Home from "./pages/user/Home";
import Cart from "./pages/user/Cart";
import Order from "./pages/user/Order";
import UserProfile from "./pages/user/UserProfile";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import ForgotPassword1 from "./pages/user/ForgotPassword1";
import ForgotPassword2 from "./pages/user/ForgotPassword2";
import ForgotPassword3 from "./pages/user/ForgotPassword3";
import Guide from "./pages/user/Guide";
import Presentation from "./pages/user/Presentation";
import Contact from "./pages/user/Contact";
import CompleteOrder from "./components/CompleteOrder";
import ErrorOrder from "./components/ErrorOrder";
import Product from './pages/user/Product'
import Review from './pages/user/ReviewPage'

import AuthRoutes from "./roots/AuthRoutes";
import PrivateRoutes from "./roots/PrivateRoutes";

const roles = {
  user: "USER",
  admin: "ADMIN",
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes dành cho user */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="product/:categoryId" element={<Product />} />
          <Route path="review/:orderId" element={<Review />} />
          <Route path="guidepage" element={<Guide />} />
          <Route path="presentation" element={<Presentation />} />
          <Route path="contact" element={<Contact />} />

          <Route element={<AuthRoutes />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />            
            <Route path="forgotpassword1" element={<ForgotPassword1 />} />
            <Route path="forgotpassword2" element={<ForgotPassword2 />} />
            <Route path="forgotpassword3" element={<ForgotPassword3 />} />           
          </Route>

          <Route element={<PrivateRoutes allowedRoles={[roles.user, roles.admin]} />}>
            <Route path="userprofile" element={<UserProfile />} />
            <Route path="cart" element={<Cart />} />
            <Route path="order" element={<Order />} />
          </Route>
        </Route>
        <Route path="CompleteOrder" element={<CompleteOrder />}></Route>
        <Route path="ErrorOrder" element={<ErrorOrder />}></Route>

        {/* Routes dành cho admin */}
        <Route element={<PrivateRoutes allowedRoles={[roles.admin]} />} />
      </Routes>
    </Router>
  );
}

export default App;
