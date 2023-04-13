import Header from "../components/header/Header";
import { Table } from "antd";
import { useEffect, useState } from "react";

const InvoicePage = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const getInvoices = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/invoices/get-all");
        const data = await res.json();
        const newData = data.map((item) => {
          return { ...item, key: item._id };
        });
        setInvoices(newData);
      } catch (error) {
        console.log(error);
      }
    };

    getInvoices();
  }, []);

  const columns = [
    {
      title: "Müşteri Adı",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Telefon Numarası",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
    },
    {
      title: "İşlem Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record) => {
        return <span>{text.substring(0, 10)}</span>;
      },
    },
  ];

  return (
    <>
      <Header />
      <div className="px-6">
        <h1 className="text-4xl text-center font-bold mb-4">Müşteriler</h1>
        <Table
          dataSource={invoices}
          columns={columns}
          bordered
          pagination={false}
          scroll={{ x: 1200, y: 500 }}
        />
      </div>
    </>
  );
};

export default InvoicePage;
