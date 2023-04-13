import { addProduct } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";

const ProductItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addProduct({ ...item, quantity: 1, key: item._id }));
  };

  return (
    <div
      className="product-item border hover:shadow-lg cursor-pointer transition-all select-none"
      onClick={handleClick}
    >
      <div className="product-image">
        <img
          src={item.img}
          alt={item.title}
          className="h-28 object-cover w-full border-b"
        />
      </div>
      <div className="product-info flex flex-col p-3 items-center">
        <span className="font-bold">{item.title}</span>
        <span>{item.price.toFixed(2)}₺</span>
      </div>
    </div>
  );
};

export default ProductItem;
