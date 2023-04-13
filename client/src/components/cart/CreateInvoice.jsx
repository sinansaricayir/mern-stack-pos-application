import { Form, Modal, Input, Select, Card, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const CreateInvoice = ({ isModalOpen, setIsModalOpen }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      var res = await fetch("http://localhost:4000/api/invoices/add-invoice", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          subTotal: cart?.total?.toFixed(2),
          tax: ((cart.total * cart.tax) / 100).toFixed(2),
          totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
          cartItems: cart.cartItems,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      if (res.status === 200) {
        message.success("Fatura Başarılı Bir Şekilde Oluşturuldu.");
        setIsModalOpen(false);
        dispatch(reset());
        navigate("/invoices");
      }
    } catch (error) {
      message.error("İşlem Başarısız.");
      console.log(error);
    }
  };

  return (
    <Modal
      title="Fatura Oluştur"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name={"customerName"}
          label="Müşteri Adı"
          rules={[{ required: true, message: "Lütfen Bir Ad Yazınız!" }]}
        >
          <Input placeholder="Müşteri Adı Yazınız..." />
        </Form.Item>
        <Form.Item
          name={"customerPhoneNumber"}
          label="Telefon Numarası"
          rules={[
            { required: true, message: "Lütfen Bir Telefon Numarası Yazınız!" },
          ]}
        >
          <Input
            placeholder="Telefon Numarası Yazınız..."
            maxLength={11}
            type="number"
          />
        </Form.Item>
        <Form.Item
          name={"paymentMode"}
          label="Ödeme Yöntemi"
          rules={[
            { required: true, message: "Lütfen Bir Ödeme Yöntemi Yazınız!" },
          ]}
        >
          <Select placeholder="Ödeme Yöntemi Seçiniz...">
            <Select.Option value="Nakit">Nakit</Select.Option>
            <Select.Option value="Kredi Kartı">Kredi Kartı</Select.Option>
          </Select>
        </Form.Item>
        <Card className="w-full">
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
          <div className="flex justify-end">
            <Button
              size="medium"
              type="primary"
              className="mt-4"
              onClick={() => setIsModalOpen(true)}
              htmlType="submit"
            >
              Sipariş Oluştur
            </Button>
          </div>
        </Card>
      </Form>
    </Modal>
  );
};

export default CreateInvoice;
