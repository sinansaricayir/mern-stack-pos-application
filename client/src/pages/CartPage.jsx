import Header from "../components/header/Header";
import { Table, Card, Button, message, Popconfirm } from "antd";
import { useState } from "react";
import CreateInvoice from "../components/cart/CreateInvoice";
import { useDispatch, useSelector } from "react-redux";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  ClearOutlined,
} from "@ant-design/icons";
import { increase, decrease, deleteProduct, reset } from "../redux/cartSlice";

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch(increase);

  const columns = [
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      key: `${Math.random()}`,
      width: "120px",
      render: (text) => {
        return <img src={text} alt="" className="w-full h-20 object-cover" />;
      },
    },
    {
      title: "Ürün Adı",
      dataIndex: "title",
      key: `${Math.random()}`,
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      key: `${Math.random()}`,
      render: (text) => {
        return <span>{text.toFixed(2)}₺</span>;
      },
    },
    {
      title: "Ürün Adeti",
      dataIndex: "quantity",
      key: `${Math.random()}`,
      render: (text, record) => {
        return (
          <div className="flex items-center">
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full"
              icon={<PlusCircleOutlined />}
              onClick={() => dispatch(increase(record))}
            />
            <span className="font-bold w-6 inline-block text-center">
              {record.quantity}
            </span>
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full"
              icon={<MinusCircleOutlined />}
              onClick={() => {
                if (record.quantity === 1) {
                  if (window.confirm("Ürün Silinsin Mi?")) {
                    dispatch(decrease(record));
                    message.info("Ürün Başarıyla Sepetten Silindi.");
                  }
                }
                if (record.quantity > 1) {
                  dispatch(decrease(record));
                }
              }}
            />
          </div>
        );
      },
    },
    {
      title: "Toplam Fiyatı",
      dataIndex: "generalPrice",
      key: `${Math.random()}`,
      render: (text, record) => {
        return <span>{(record.quantity * record.price).toFixed(2)}₺</span>;
      },
    },
    {
      title: "Aksiyon",
      dataIndex: "action",
      key: `${Math.random()}`,
      width: "100px",
      render: (text, record) => {
        return (
          <Popconfirm
            title="Ürün Silme "
            description="Ürünü silmek istediğinizden emin misiniz ?"
            okText="Evet"
            cancelText="Hayır"
            onConfirm={() => dispatch(deleteProduct(record))}
          >
            <Button type="primary" danger>
              Sil
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <>
      <Header />
      <div className="px-6">
        <Table
          dataSource={cart.cartItems}
          columns={columns}
          bordered
          pagination={false}
          scroll={{ x: 1200, y: 400 }}
        />
        <div className="flex justify-end mt-4">
          <Card className="w-72">
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>
                {cart.total.toFixed(2) > 0 ? cart.total.toFixed(2) : 0}₺
              </span>
            </div>
            <div className="flex justify-between my-2">
              <span>KDV %{cart.tax}</span>
              <span className="text-red-600">
                {(cart.total * cart.tax) / 100 > 0
                  ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                  : 0}
                ₺
              </span>
            </div>
            <div className="flex justify-between">
              <b>Toplam</b>
              <b>
                {" "}
                {(cart.total + (cart.total * cart.tax) / 100).toFixed(2) > 0
                  ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                  : 0}
                ₺
              </b>
            </div>
            <Button
              size="large"
              type="primary"
              className="mt-4 w-full"
              onClick={() => setIsModalOpen(true)}
              disabled={cart.cartItems.length > 0 ? false : true}
            >
              Sipariş Oluştur
            </Button>
            <Popconfirm
              title="Ürün Silme "
              description="Ürünü silmek istediğinizden emin misiniz ?"
              okText="Evet"
              cancelText="Hayır"
              onConfirm={() => dispatch(reset())}
              className="w-full mt-2 flex items-center justify-center"
            >
              {cart.cartItems.length > 0 ? (
                <Button
                  type="primary"
                  size="large"
                  className="w-full mt-2 flex items-center justify-center"
                  icon={<ClearOutlined />}
                  danger
                  disabled={cart.cartItems.length > 0 ? false : true}
                >
                  Tümünü Sil
                </Button>
              ) : (
                ""
              )}
            </Popconfirm>
          </Card>
        </div>
      </div>
      <CreateInvoice
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default CartPage;
