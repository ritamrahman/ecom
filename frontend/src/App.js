import { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
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

function App() {
  // load currently logged in user on page load.
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <Router>
        <Header />
        <div className="container container-fluid">
          <Route path="/" component={Home} exact />
          <Route path="/search/:keyword" component={Home} />
          <Route exact path="/product/:id" component={ProductDetails} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <ProtectedRoute path="/me" component={Profile} exact />
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
