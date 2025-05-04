"use client";
import { useState, useEffect } from "react";
import { Modal, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDrinks } from "@/hooks/useDrinks";
import { useCategories } from "@/contexts/CategoriesContext";
import DrinksTable from "@/components/manage-drinks/DrinksTable";
import DrinkFormModal from "@/components/manage-drinks/DrinkFormModal";

const ManageDrinks = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [drinks, setDrinks] = useState([]);
  const [editingDrink, setEditingDrink] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const { getDrinks, addDrink, updateDrink, deleteDrink } = useDrinks();
  const { categories, loading } = useCategories();

  useEffect(() => {
    fetchDrinks();
  }, []);

  const fetchDrinks = async () => {
    const data = await getDrinks();
    setDrinks(data);
  };

  const handleEdit = (drink) => {
    form.setFieldsValue({
      ...drink,
      category: drink.category.id,
    });
    setImageUrl(drink.imageUrl || "");
    setEditingDrink(drink);
    setIsModalVisible(true);
  };

  const handleDelete = (slug) => {
    Modal.confirm({
      title: "Are you sure you want to delete this drink?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        await deleteDrink(slug);
        fetchDrinks();
      },
    });
  };

  const handleSubmit = async (values) => {
    if (!imageUrl) {
      return Modal.error({ title: "Please upload an image first." });
    }

    const selectedCategory = categories.find(
      (cat) => cat.id === values.category
    );

    const payload = {
      ...values,
      imageUrl,
      category: selectedCategory,
    };

    if (editingDrink) {
      payload.id = editingDrink.id;
      await updateDrink(payload);
    } else {
      await addDrink(payload);
    }

    fetchDrinks();
    setIsModalVisible(false);
    form.resetFields();
    setImageUrl("");
    setEditingDrink(null);
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="px-8 pt-6 pb-4 bg-slate-200">
        <h1 className="text-2xl font-bold">MANAGE DRINKS</h1>
      </div>

      <div className="pl-12 pr-8">
        <div className="flex justify-between items-center my-6">
          <h2 className="text-xl font-bold mt-2">Menu Items</h2>
          <button
            className="flex gap-2 items-center text-white px-4 py-2 text-lg bg-rose-800 rounded-md hover:bg-rose-700 ring-1 ring-white"
            onClick={() => {
              form.resetFields();
              setEditingDrink(null);
              setIsModalVisible(true);
            }}
          >
            <PlusOutlined /> <p>NEW DRINK</p>
          </button>
        </div>

        <DrinksTable
          drinks={drinks}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />

        <DrinkFormModal
          form={form}
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onSubmit={handleSubmit}
          editingDrink={editingDrink}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          categories={categories}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ManageDrinks;
