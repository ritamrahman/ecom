import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="container container-fluid">
          <Route exact path="/" component={Home} />
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
