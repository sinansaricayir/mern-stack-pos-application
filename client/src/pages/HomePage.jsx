import { useState, useEffect } from "react";
import CartTotals from "../components/cart/CartTotals";
import Categories from "../components/categories/Categories";
import Header from "../components/header/Header";
import Products from "../components/products/Products";
import { Spin } from "antd";

function HomePage() {
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searched, setSearched] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(
          process.env.REACT_APP_SERVER_URL + "/api/categories/get-all"
        );
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  return (
    <>
      <Header setSearched={setSearched} />
      {products && categories ? (
        <div className="home px-6 flex md:flex-row flex-col justify-between gap-10 h-screen">
          <div className="categories overflow-auto md:max-h-[calc(100vh_-_112px)] min-h-[125px] pb-10 ">
            <Categories
              categories={categories}
              setCategories={setCategories}
              products={products}
              setFiltered={setFiltered}
            />
          </div>
          <div className="products flex-[8] max-h-[calc(100vh_-_112px)] overflow-y-auto pb-10 min-h-[500px]">
            <Products
              products={products}
              setProducts={setProducts}
              categories={categories}
              filtered={filtered}
              searched={searched}
            />
          </div>
          <div className="cart-totals min-w-[300px] md:-mr-[24px] md:-mt-[24px] md:pb-0 pb-12 border">
            <CartTotals />
          </div>
        </div>
      ) : (
        <Spin size="large" className="absolute left-1/2 top-1/2" />
      )}
    </>
  );
}

export default HomePage;
