const StatisticCard = ({ title, amount, image }) => {
  return (
    <>
      <div className="cart-item bg-gray-800 flex p-8 rounded-lg gap-x-4">
        <div className="h-16 w-16 bg-white rounded-full p-3">
          <img src={image} alt="user" />
        </div>
        <div className="text-white">
          <p className="mb-2 text-lg font-medium text-gray-400">{title}</p>
          <p className="text-xl font-semibold text-gray-200">{amount}</p>
        </div>
      </div>
    </>
  );
};

export default StatisticCard;
