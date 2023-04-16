import { Form, Modal, Table, Input, Button, message } from "antd";
import { useState } from "react";

const Edit = ({
  isEditModalOpen,
  setIsEditModalOpen,
  categories,
  setCategories,
}) => {
  const [editingRow, setEditingRow] = useState({});

  const onFinish = (values) => {
    try {
      fetch(
        process.env.REACT_APP_SERVER_URL + "/api/categories/update-category",
        {
          method: "PUT",
          body: JSON.stringify({ ...values, categoryId: editingRow._id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      message.success("Kategori başarıyla güncellendi.");
      setCategories(
        categories.map((item) => {
          if (item._id === editingRow._id) {
            return { ...item, title: values.title };
          }
          return item;
        })
      );
    } catch (error) {
      message.error("Bir şeyler yanlış gitti...");
    }
  };

  const deleteCategory = (id) => {
    if (window.confirm("Silmek istediğinizden emin misiniz?")) {
      try {
        fetch(
          process.env.REACT_APP_SERVER_URL + "/api/categories/delete-category",
          {
            method: "DELETE",
            body: JSON.stringify({ categoryId: id }),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          }
        );
        message.success("Kategori başarıyla silindi.");
        setCategories(categories.filter((item) => item._id !== id));
      } catch (error) {
        message.error("Bir şeyler yanlış gitti...");
      }
    }
  };

  const columns = [
    {
      title: "Kategori Adı",
      dataIndex: "title",
      render: (_, record) => {
        if (record._id === editingRow._id) {
          return (
            <Form.Item className="mb-0" name="title">
              <div>
                <p className="mb-2">{record.title}</p>
                <Input />
              </div>
            </Form.Item>
          );
        } else {
          return <p> {record.title}</p>;
        }
      },
    },
    {
      title: "Aksiyon",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div>
            <Button
              type="link"
              onClick={() => setEditingRow(record)}
              className="pl-0"
            >
              Düzenle
            </Button>
            <Button type="text" htmlType="submit">
              Kaydet
            </Button>
            <Button
              type="text"
              danger
              onClick={() => deleteCategory(record._id)}
            >
              Sil
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Modal
      title="Kategori İşlemleri"
      open={isEditModalOpen}
      onCancel={() => setIsEditModalOpen(false)}
      footer={false}
    >
      <Form onFinish={onFinish}>
        <Table
          bordered
          dataSource={categories}
          columns={columns}
          rowKey={"_id"}
        />
      </Form>
    </Modal>
  );
};

export default Edit;
