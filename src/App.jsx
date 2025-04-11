import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";

import Home from "./pages/user/Home";
import Cart from "./pages/user/Cart";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import ForgotPassword1 from "./pages/user/ForgotPassword1";
import ForgotPassword2 from "./pages/user/ForgotPassword2";
import ForgotPassword3 from "./pages/user/ForgotPassword3";

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
          <Route path="home" element={<Home />} />
          <Route path="cart" element={<Cart />} />

          <Route element={<AuthRoutes />}>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />} />
            
            <Route path="forgotpassword1" element={<ForgotPassword1 />} />
            <Route path="forgotpassword2" element={<ForgotPassword2 />} />
            <Route path="forgotpassword3" element={<ForgotPassword3 />} />
           
          </Route>
        </Route>

        {/* Routes dành cho admin */}
        <Route element={<PrivateRoutes allowedRoles={[roles.admin]} />} />
      </Routes>
    </Router>
  );
}

export default App;
