import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Policy from "./pages/Policy.jsx";
import Pagenotfound from "./pages/Pagenotfound.jsx";
import Register from "./components/Layout/Auth/Register.jsx";
import Login from "./components/Layout/Auth/Login.jsx";
import Dashboard from "./user/Dashboard.jsx";
import PrivateRoute from "./components/Route/Private.jsx";
import ForgotPasssword from "./components/Layout/Auth/ForgotPassword.jsx";
import AdminRoute from "./components/Route/AdminRoute.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import CreateCategory from "./pages/Admin/CreateCategory.jsx";
import CreateProduct from "./pages/Admin/CreateProduct.jsx";
import Users from "./pages/Admin/Users.jsx";
import Orders from "./user/Order.jsx";
import Profile from "./user/Profile.jsx";
import Products from "./pages/Admin/Product.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/dashboard" element={<PrivateRoute/>}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} /> 
        </Route>
        <Route path="/dashboard" element={<AdminRoute/>}>
          <Route path="admin" element={<AdminDashboard/>} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasssword/>} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;