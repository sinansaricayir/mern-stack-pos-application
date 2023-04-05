import Header from "../components/header/Header";
import StatisticCard from "../components/statistic/StatisticCard";

const StatisticPage = () => {
  return (
    <>
      <Header />
      <div className="px-6">
        <h1 className="text-4xl text-center font-bold mb-4">İstatistikler</h1>
        <div>
          <h2 className="text-lg">
            Hoş geldin{" "}
            <span className="text-xl text-green-700 font-bold">admin</span>
          </h2>
          <div className="statistic-cards grid grid-cols-4 my-10 gap-10">
            <StatisticCard
              title={"Toplam Müşteri"}
              amount={24}
              image={"images/user.png"}
            />
            <StatisticCard
              title={"Toplam Kazanç"}
              amount={1266.84}
              image={"images/money.png"}
            />
            <StatisticCard
              title={"Toplam Satış"}
              amount={7}
              image={"images/sale.png"}
            />
            <StatisticCard
              title={"Toplam Ürün"}
              amount={46}
              image={"images/product.png"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StatisticPage;
