import { Form, Table, Input, Button, message, Select, Modal } from "antd";
import { useState, useEffect } from "react";

const Edit = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(
          process.env.REACT_APP_SERVER_URL + "/api/products/get-all"
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, []);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await fetch(
          process.env.REACT_APP_SERVER_URL + "/api/categories/get-all"
        );
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
  }, []);

  const onFinish = (values) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL + "/api/products/update-product", {
        method: "PUT",
        body: JSON.stringify({ ...values, productId: editingItem._id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      setProducts(
        products.map((item) => {
          if (item._id === editingItem._id) {
            return {
              ...item,
              title: values.title,
              img: values.img,
              price: values.price,
              category: values.category,
            };
          }
          return item;
        })
      );
      message.success("Ürün başarıyla güncellendi.");
      setIsEditModalOpen(false);
    } catch (error) {
      message.error("Bir şeyler yanlış gitti...");
    }
  };

  const deleteCategory = (id) => {
    if (window.confirm("Silmek istediğinizden emin misiniz?")) {
      try {
        fetch(
          process.env.REACT_APP_SERVER_URL + "/api/products/delete-product",
          {
            method: "DELETE",
            body: JSON.stringify({ productId: id }),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          }
        );
        message.success("Ürün başarıyla silindi.");
        setProducts(products.filter((item) => item._id !== id));
      } catch (error) {
        message.error("Bir şeyler yanlış gitti...");
      }
    }
  };

  const columns = [
    {
      title: "Ürün Adı",
      dataIndex: "title",
      width: "8%",
      render: (_, record) => {
        return <p> {record.title}</p>;
      },
    },
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      width: "4%",
      render: (_, record) => {
        return (
          <img src={record.img} alt="" className="w-full h-20 object-cover" />
        );
      },
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      width: "8%",
    },
    {
      title: "Kategori",
      dataIndex: "category",
      width: "8%",
    },
    {
      title: "Aksiyon",
      dataIndex: "action",
      width: "8%",
      render: (_, record) => {
        return (
          <div>
            <Button
              type="text"
              className="pl-0"
              onClick={() => {
                setIsEditModalOpen(true);
                setEditingItem(record);
              }}
            >
              Düzenle
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
    <>
      <Table
        bordered
        dataSource={products}
        columns={columns}
        rowKey={"_id"}
        scroll={{ x: 1000, y: 500 }}
      />
      <Modal
        title="Yeni Ürün Ekle"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
          initialValues={editingItem}
        >
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
              Güncelle
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Edit;
