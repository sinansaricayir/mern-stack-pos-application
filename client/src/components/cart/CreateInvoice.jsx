import { Form, Modal, Input, Select, Card, Button } from "antd";

const CreateInvoice = ({ isModalOpen, setIsModalOpen }) => {
  const onFinish = (values) => {
    console.log("Success:", values);
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
          name={"customerPhone"}
          label="Telefon Numarası"
          rules={[
            { required: true, message: "Lütfen Bir Telefon Numarası Yazınız!" },
          ]}
        >
          <Input placeholder="Telefon Numarası Yazınız..." maxLength={11}/>
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
            <span>110.00₺</span>
          </div>
          <div className="flex justify-between my-2">
            <span>KDV Toplam %8</span>
            <span className="text-red-600">+18.44₺</span>
          </div>
          <div className="flex justify-between">
            <b>Toplam</b>
            <b>110.00₺</b>
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
