import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="container container-fluid">
          <Route exact path="/" component={Home} />
          <Route path="/search/:keyword" component={Home} />
          <Route exact path="/product/:id" component={ProductDetails} />
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
