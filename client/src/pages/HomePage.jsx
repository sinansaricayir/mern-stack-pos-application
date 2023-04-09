import { useState, useEffect } from "react";
import CartTotals from "../components/cart/CartTotals";
import Categories from "../components/categories/Categories";
import Header from "../components/header/Header";
import Products from "../components/products/Products";

function HomePage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/categories/get-all");
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
      <Header />
      <div className="home px-6 flex md:flex-row flex-col justify-between gap-10">
        <div className="categories overflow-auto max-h-[calc(100vh_-_112px)] pb-10">
          <Categories categories={categories} setCategories={setCategories} />
        </div>
        <div className="products flex-[8] max-h-[calc(100vh_-_112px)] overflow-y-auto pb-10">
          <Products />
        </div>
        <div className="cart-totals min-w-[300px] md:-mr-[24px] md:-mt-[24px] md:pb-0 pb-12">
          <CartTotals />
        </div>
      </div>
    </>
  );
}

export default HomePage;
