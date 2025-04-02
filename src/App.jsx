import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import Home from "./pages/user/Home";
import Cart from "./pages/user/Cart";
function App() {
  return (
    <Router>
      {/* Routes dành cho user */}
      <Routes>
        <Route path="/" element={<UserLayout><Home /></UserLayout>} />
        <Route path="/cart" element={<UserLayout><Cart /></UserLayout>} />
      </Routes>
    </Router>    
  );
}

export default App;
