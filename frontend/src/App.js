import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

import "./App.css";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";

import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { loadUser } from "./actions/userAction";
import store from "./store";
import Profile from "./components/user/Profile";

import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import ForgotPassword from "./components/user/ForgotPassword";
import UpdatePassword from "./components/user/UpdatePassword";
import NewPassword from "./components/user/NewPassword";

import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";

// Payment
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./components/cart/Payment";
import { useSelector } from "react-redux";
import OrderSuccess from "./components/cart/OrderSuccess";
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";
import Dashboard from "./components/admin/Dashboard";
import ProductsList from "./components/admin/ProductsList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  // load currently logged in user on page load.
  useEffect(() => {
    store.dispatch(loadUser());

    // get stripe api key from backend
    async function getStripeApi() {
      const { data } = await axios.get("/v1/stripeapi");
      setStripeApiKey(data.stripeApiKey);
    }
    getStripeApi();
  }, []);

  // const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  return (
    <>
      <Router>
        <Header />
        <div className="container container-fluid">
          {/* Public Route */}
          <Route path="/" component={Home} exact />
          <Route path="/search/:keyword" component={Home} />
          <Route exact path="/product/:id" component={ProductDetails} exact />
          {/* Auth Route */}
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/password/forgot" component={ForgotPassword} exact />
          <Route path="/password/reset/:token" component={NewPassword} exact />
          <Route path="/cart" component={Cart} exact />

          {/* Protected Route */}
          <ProtectedRoute path="/me" component={Profile} exact />
          <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
          <ProtectedRoute path="/shipping" component={Shipping} />
          <ProtectedRoute path="/confirm" component={ConfirmOrder} exact />
          <ProtectedRoute path="/success" component={OrderSuccess} />
          <ProtectedRoute path="/orders/me" component={ListOrders} exact />
          <ProtectedRoute path="/order/:id" component={OrderDetails} exact />
          <ProtectedRoute path="/password/update" component={UpdatePassword} exact />
          {/* payment */}
          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path="/payment" component={Payment} />
            </Elements>
          )}
        </div>

        {/* Admin Routes */}
        <ProtectedRoute path="/dashboard" isAdmin={true} component={Dashboard} exact />
        <ProtectedRoute path="/admin/products" isAdmin={true} component={ProductsList} exact />
        <ProtectedRoute path="/admin/product" isAdmin={true} component={NewProduct} exact />
        <ProtectedRoute path="/admin/product/:id" isAdmin={true} component={UpdateProduct} exact />
        <Footer />
      </Router>
    </>
  );
}

export default App;
