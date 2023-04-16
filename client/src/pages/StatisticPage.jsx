import Header from "../components/header/Header";
import StatisticCard from "../components/statistic/StatisticCard";
import React, { useState, useEffect } from "react";
import { Area, Pie } from "@ant-design/plots";
import { Spin } from "antd";

const StatisticPage = () => {
  const [data, setData] = useState();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(
          process.env.REACT_APP_SERVER_URL + "/api/products/get-all"
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, []);

  const asyncFetch = () => {
    fetch(process.env.REACT_APP_SERVER_URL + "/api/invoices/get-all")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };

  const totalAmount = () => {
    const amount = data.reduce((total, item) => item.totalAmount + total, 0);
    return `${amount.toFixed(2)} ₺`;
  };

  const config = {
    data,
    xField: "customerName",
    yField: "subTotal",
    xAxis: {
      range: [0, 1],
    },
  };

  const config2 = {
    appendPadding: 10,
    data,
    angleField: "subTotal",
    colorField: "customerName",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "AntV\nG2Plot",
      },
    },
  };

  const localStr = localStorage.getItem("postUser");
  const user = JSON.parse(localStr);

  return (
    <>
      <Header />
      {data ? (
        <div className="px-6 md:pb-0 pb-20">
          <h1 className="text-4xl text-center font-bold mb-4">İstatistikler</h1>
          <div>
            <h2 className="text-lg">
              Hoş geldin{" "}
              <span className="text-xl text-green-700 font-bold">
                {user.username}
              </span>
            </h2>
            <div className="statistic-cards grid xl:grid-cols-4 md:grid-cols-2 my-10 md:gap-10 gap-4">
              <StatisticCard
                title={"Toplam Müşteri"}
                amount={data.length}
                image={"images/user.png"}
              />
              <StatisticCard
                title={"Toplam Kazanç"}
                amount={totalAmount()}
                image={"images/money.png"}
              />
              <StatisticCard
                title={"Toplam Satış"}
                amount={data.length}
                image={"images/sale.png"}
              />
              <StatisticCard
                title={"Toplam Ürün"}
                amount={products.length}
                image={"images/product.png"}
              />
            </div>
            <div className="flex justify-between gap-10 lg:flex-row flex-col md:p-10 p-4">
              <div className="lg:w-1/2 lg:h-72 h-72">
                <Area {...config} />
              </div>
              <div className="lg:w-1/2 lg:h-72 h-72">
                <Pie {...config2} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spin size="large" className="absolute left-1/2 top-1/2" />
      )}
    </>
  );
};

export default StatisticPage;
