import Product from "./Pages/Product";
import Home from "./Pages/Home";
import ProductList from "./Pages/ProductList";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import { Routes, Route, Navigate } from "react-router-dom";
import Success from "./Pages/Success";
import { useSelector } from "react-redux";
import Signup from "./Pages/Signup";
import AllProducts from "./Pages/AllProducts";
import LandingPage from "./Pages/LandingPage";
import WelcomePage from "./Pages/WelcomePage";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <div>
      <Routes>
        <Route exact path="/shop" element={<Home />} />
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/products" element={<AllProducts />} />
        <Route exact path="/products/:category" element={<ProductList />} />
        <Route exact path="/products/:id" element={<Product />} />
        <Route
          exact
          path="cart"
          element={user ? <Cart /> : <Navigate to="/login" />}
        />
        <Route exact path="/success" element={<Success />} />
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          exact
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
        <Route path="/auth/:confirmationCode" element={<WelcomePage />} exact />
      </Routes>
    </div>
  );
}

export default App;
