import { React, useEffect } from "react";
import "../App.css";
import MetaData from "./layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productAction";
import Product from "./product/Product";
import Loader from "./layouts/Loader";
import { useAlert } from "react-alert";

export default function Home() {
  // get all thing from state
  const { loading, products, error, productsCount } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts());
  }, [dispatch, alert, error]);

  console.log(products);

  return (
    <>
      <MetaData title={"Buy Best Product Online"} />
      <h1 id="products_heading">Latest Products</h1>
      {loading ? (
        <Loader />
      ) : (
        <section id="products" className="container mt-5">
          <div className="row">
            {/* loop all products */}
            {products &&
              products.map((product) => (
                <Product product={product} key={product._id} />
              ))}
          </div>
        </section>
      )}
    </>
  );
}
