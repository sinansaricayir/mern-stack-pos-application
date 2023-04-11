import { Button, Form, Input, Modal, Select, message } from "antd";

const Add = ({
  isAddModalOpen,
  setIsAddModalOpen,
  products,
  setProducts,
  categories,
}) => {
  const [form] = Form.useForm();
  const onFinish = (value) => {
    try {
      fetch("http://localhost:4000/api/products/add-product", {
        method: "POST",
        body: JSON.stringify(value),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Ürün başarıyla eklendi.");
      setIsAddModalOpen(false);
      form.resetFields();
      setProducts([
        ...products,
        {
          _id: Math.random(),
          title: value.title,
          img: value.img,
          price: Number(value.price),
          category: value.category,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Yeni Ürün Ekle"
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label={"Ürün Adı"}
          name="title"
          rules={[
            {
              required: true,
              message: "Bu Alan Boş Geçilemez!",
            },
          ]}
        >
          <Input placeholder="ürün adı giriniz" />
        </Form.Item>
        <Form.Item
          label={"Ürün Görsel Link Adresi"}
          name="img"
          rules={[
            {
              required: true,
              message: "Bu Alan Boş Geçilemez!",
            },
          ]}
        >
          <Input placeholder="ürün görsel linki giriniz" />
        </Form.Item>
        <Form.Item
          label={"Ürün Fiyatı"}
          name="price"
          rules={[
            {
              required: true,
              message: "Bu Alan Boş Geçilemez!",
            },
          ]}
        >
          <Input placeholder="ürün fiyat giriniz" />
        </Form.Item>
        <Form.Item
          label={"Kategori Seç"}
          name="category"
          rules={[
            {
              required: true,
              message: "Bu Alan Boş Geçilemez!",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="kategori seçmek için yazın "
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.title ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.title ?? "")
                .toLowerCase()
                .localeCompare((optionB?.title ?? "").toLowerCase())
            }
            options={categories.map((item, i) => {
              return { value: item.title, label: item.title };
            })}
          />
        </Form.Item>
        <Form.Item className="flex justify-end mb-0">
          <Button type="primary" htmlType="submit">
            Oluştur
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
