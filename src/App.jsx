import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import Home from "./pages/user/Home";
import Cart from "./pages/user/Cart";

import PrivateRoutes from "./roots/PrivateRoutes";

const roles = {
  user: 'USER',
  admin: 'ADMIN',
};
function App() {
  return (
    <Router>
      {/* Routes dành cho user */}
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route path="/home" element={<Home />} /> 
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>

      {/* Routes dành cho admin */}
      <Routes element={<PrivateRoutes allowedRoles={[roles.admin]} />}>
        
      </Routes>
    </Router>    
  );
}

export default App;
