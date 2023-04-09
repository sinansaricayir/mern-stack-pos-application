import "./style.css";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, message } from "antd";
import { useState } from "react";

const Categories = ({ categories, setCategories }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (value) => {
    try {
      fetch("http://localhost:4000/api/categories/add-category", {
        method: "POST",
        body: JSON.stringify(value),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Kategori başarıyla eklendi.");
      setIsModalOpen(false);
      form.resetFields();
      setCategories([...categories, value]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ul className="flex gap-4 md:flex-col flex-row text-lg overflow-x-auto">
      {categories.map((item) => (
        <li className="category-item">
          <span>{item.title}</span>
        </li>
      ))}

      <li className="category-item  !bg-purple-800 hover:opacity-90">
        <PlusOutlined
          className="md:text-3xl text-2xl"
          onClick={() => setIsModalOpen(true)}
        />
      </li>

      <Modal
        title="Yeni Kategori Ekle"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
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
    </ul>
  );
};

export default Categories;
