import Header from "../components/header/Header";
import { Table, Button } from "antd";
import { useEffect, useState } from "react";
import PrintInvoice from "../components/invoice/PrintInvoice";

const InvoicePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [printData, setPrintData] = useState([]);

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
      title: "Oluşturma Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record) => {
        return <span>{text.substring(0, 10)}</span>;
      },
    },
    {
      title: "Ödeme Yöntemi",
      dataIndex: "paymentMode",
      key: "paymentMode",
    },
    {
      title: "Toplam Fiyat",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text, record) => {
        return <span>{text}₺</span>;
      },
    },
    {
      title: "Aksiyon",
      dataIndex: "action",
      key: "action",
      width: "100px",
      render: (text, record) => {
        return (
          <Button
            size="small"
            type="primary"
            className="mt-4 w-full"
            onClick={() => {
              setIsModalOpen(true);
              setPrintData(record);
            }}
          >
            Yazdır
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Header />
      <div className="px-6">
        <h1 className="text-4xl text-center font-bold mb-4">Faturalar</h1>
        <Table
          dataSource={invoices}
          columns={columns}
          bordered
          pagination={true}
          scroll={{ x: 1200, y: 500 }}
        />
      </div>
      <PrintInvoice
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        printData={printData}
      />
    </>
  );
};

export default InvoicePage;
