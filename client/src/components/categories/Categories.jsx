import { useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "./Add";
import Edit from "./Edit";
import "./style.css";

const Categories = ({ categories, setCategories }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <ul className="flex gap-4 md:flex-col flex-row text-lg overflow-x-auto">
      {categories.map((item) => (
        <li className="category-item" key={item._id}>
          <span>{item.title}</span>
        </li>
      ))}

      <li className="category-item  !bg-blue-600 hover:opacity-90">
        <PlusOutlined
          className="md:text-3xl text-2xl"
          onClick={() => setIsAddModalOpen(true)}
        />
      </li>

      <li className="category-item  !bg-fuchsia-600	 hover:opacity-90">
        <EditOutlined
          className="md:text-3xl text-2xl"
          onClick={() => setIsEditModalOpen(true)}
        />
      </li>

      <Add
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        categories={categories}
        setCategories={setCategories}
      />

      <Edit
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        categories={categories}
        setCategories={setCategories}
      />
    </ul>
  );
};

export default Categories;
