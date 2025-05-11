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
import ProductDetail from "./pages/user/ProductDetail";

import AuthRoutes from "./roots/AuthRoutes";
import PrivateRoutes from "./roots/PrivateRoutes";

import AdminLayout from './Admin/Components/Shared/Layout';
import AdminProduct from './Admin/Pages/Product';
import AdminDashboard from './Admin/Pages/Dashboard';
import AdminOrder from './Admin/Pages/Order';
import AdminCustomer from './Admin/Pages/Customer';
import AdminProductDetail from './Admin/Components/Product/ProductDetail';
import AdminOrderDetail from './Admin/Pages/OrderDetail';
import AdminCustomerDetail from './Admin/Pages/CustomerDetail';
import AdminCategory from './Admin/Pages/Category';
import AdminReview from './Admin/Pages/Review';
import AdminAddProduct from './Admin/Components/AddProduct/AddProduct';
import AdminProfile from './Admin/Pages/Profile';
import Notification from './Admin/Pages/Notification';
import Voucher from './Admin/Pages/Voucher';

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
          <Route path="productdetail/:id" element={<ProductDetail />} />
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
        <Route element={<PrivateRoutes allowedRoles={[roles.admin]} />}>
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="product" element={<AdminProduct />} />
            <Route path="order" element={<AdminOrder />} />
            <Route path="customer" element={<AdminCustomer />} />
            <Route path="customer/customerdetail/:customerId" element={<AdminCustomerDetail />} />
            <Route path="product" element={<AdminProduct />} />
            <Route path="product/addproduct" element={<AdminAddProduct />} />
            <Route path="product/productdetail/:productId" element={<AdminProductDetail />} />
            <Route path="order/orderdetail/:orderId" element={<AdminOrderDetail />} />
            <Route path="category" element={<AdminCategory />} />
            <Route path="review" element={<AdminReview />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="notification" element={<Notification />} />
            <Route path="voucher" element={<Voucher />} />
          </Route>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
