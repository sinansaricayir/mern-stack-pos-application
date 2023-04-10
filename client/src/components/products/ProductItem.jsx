const ProductItem = ({ item }) => {
  return (
    <div className="product-item border hover:shadow-lg cursor-pointer transition-all select-none">
      <div className="product-image">
        <img
          src={item.img}
          alt={item.title}
          className="h-28 object-cover w-full border-b"
        />
      </div>
      <div className="product-info flex flex-col p-3 items-center">
        <span className="font-bold">{item.title}</span>
        <span>{item.price}₺</span>
      </div>
    </div>
  );
};

export default ProductItem;
