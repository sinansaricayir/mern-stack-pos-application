import { Button, Form, Input, Modal } from "antd";
import { message } from "antd";

const Add = ({
  isAddModalOpen,
  setIsAddModalOpen,
  categories,
  setCategories,
}) => {
  const [form] = Form.useForm();

  const onFinish = (value) => {
    try {
      fetch("http://localhost:4000/api/categories/add-category", {
        method: "POST",
        body: JSON.stringify(value),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Kategori başarıyla eklendi.");
      setIsAddModalOpen(false);
      form.resetFields();
      setCategories([
        ...categories,
        {
          _id: Math.random(),
          title: value.title,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Yeni Kategori Ekle"
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label={"Kategori Ekle"}
          name="title"
          rules={[
            {
              required: true,
              message: "Bu Alan Boş Geçilemez!",
            },
          ]}
        >
          <Input />
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
