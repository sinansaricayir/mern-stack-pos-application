import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "../products/Add";
import { useNavigate } from "react-router-dom";

const Products = ({ products, setProducts, categories }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/products/get-all");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, []);

  return (
    <div className="products-wrapper grid grid-cols-card gap-4">
      {products.map((item, i) => (
        <ProductItem item={item} key={i} />
      ))}
      <div
        className="product-item min-h-[180px] bg-blue-600	 border hover:shadow-lg cursor-pointer transition-all select-none flex items-center justify-center md:text-3xl text-white p-10 hover:opacity-90"
        onClick={() => setIsAddModalOpen(true)}
      >
        <PlusOutlined />
      </div>
      <div
        className="product-item min-h-[180px] bg-fuchsia-600		 border hover:shadow-lg cursor-pointer transition-all select-none flex items-center justify-center md:text-3xl text-white p-10 hover:opacity-90"
        onClick={() => navigate("/products")}
      >
        <EditOutlined />
      </div>

      <Add
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        products={products}
        setProducts={setProducts}
        categories={categories}
      />
    </div>
  );
};

export default Products;
