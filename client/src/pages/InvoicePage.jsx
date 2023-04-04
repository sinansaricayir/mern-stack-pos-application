import Header from "../components/header/Header";
import { Table, Card, Button } from "antd";
import { useState } from "react";
import PrintInvoice from "../components/invoice/PrintInvoice";

const InvoicePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <>
      <Header />
      <div className="px-6">
        <h1 className="text-4xl text-center font-bold mb-4">Faturalar</h1>
        <Table
          dataSource={dataSource}
          columns={columns}
          bordered
          pagination={false}
        />
        <div className="flex justify-end mt-4">
          <Card className="w-72">
            <Button
              size="large"
              type="primary"
              className="mt-4 w-full"
              onClick={() => setIsModalOpen(true)}
            >
              Yazdır
            </Button>
          </Card>
        </div>
      </div>
      <PrintInvoice isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default InvoicePage;
