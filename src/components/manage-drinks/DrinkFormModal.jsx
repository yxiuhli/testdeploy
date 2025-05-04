"use client";
import { Modal, Form, Input, Select, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import UploadImageWidget from "../UploadImageWidget";
import { useEffect } from "react";

const DrinkFormModal = ({
  form,
  visible,
  onCancel,
  onSubmit,
  editingDrink,
  imageUrl,
  setImageUrl,
  categories,
  loading,
}) => {
  useEffect(() => {
    if (visible) {
      if (!editingDrink) {
        // Reset and initialize with one empty variant when adding a new drink
        form.setFieldsValue({
          name: "",
          category: undefined,
          description: "",
          variants: [{ size: undefined, price: undefined }],
        });
        setImageUrl("");
      } else {
        // If editing, populate form with existing drink data
        form.setFieldsValue({
          name: editingDrink.name,
          category: editingDrink.categoryId,
          description: editingDrink.description,
          variants: editingDrink.variants.length
            ? editingDrink.variants
            : [{ size: undefined, price: undefined }],
        });
        setImageUrl(editingDrink.imageUrl);
      }
    }
  }, [visible]);

  return (
    <Modal
      title={editingDrink ? "EDIT DRINK" : "ADD NEW DRINK"}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
      centered
    >
      <Form form={form} layout="vertical" onFinish={onSubmit} className="mt-4">
        <div className="grid grid-cols-2 gap-y-2 gap-x-8">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter the drink name" }]}
          >
            <Input placeholder="Enter drink name" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select
              placeholder="Select a category"
              loading={loading}
              allowClear
            >
              {categories.map((cat) => (
                <Select.Option key={cat.id} value={cat.id}>
                  {cat.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter a description" }]}
            className="col-span-2"
          >
            <Input.TextArea rows={4} placeholder="Describe your drink" />
          </Form.Item>

          <Form.Item label="Image" required className="col-span-2">
            <UploadImageWidget imageUrl={imageUrl} setImageUrl={setImageUrl} />
          </Form.Item>

          <Form.List name="variants">
            {(fields, { add, remove }) => {
              const selectedSizes =
                form.getFieldValue("variants")?.map((v) => v?.size) || [];

              const canAddMore = fields.length < 3; // 👈 Allow add only if less than 3

              return (
                <div className="col-span-2">
                  <label className="block mb-2">Variants</label>

                  {fields.map((field) => {
                    const currentSize = form.getFieldValue([
                      "variants",
                      field.name,
                      "size",
                    ]);

                    return (
                      <div key={field.key} className="flex gap-4 mb-2">
                        <Form.Item
                          label="Size"
                          layout="horizontal"
                          name={[field.name, "size"]}
                          rules={[
                            { required: true, message: "Please select a size" },
                          ]}
                          className="mb-0 flex-1"
                        >
                          <Select placeholder="Select size">
                            {["S", "M", "L"].map((size) => (
                              <Select.Option
                                key={size}
                                value={size}
                                disabled={
                                  selectedSizes.includes(size) &&
                                  currentSize !== size
                                }
                              >
                                {size}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>

                        <Form.Item
                          label="Price"
                          layout="horizontal"
                          name={[field.name, "price"]}
                          rules={[
                            { required: true, message: "Please enter a price" },
                          ]}
                          className="mb-0 flex-1"
                        >
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="Enter price"
                          />
                        </Form.Item>

                        <Button
                          icon={<DeleteOutlined />}
                          onClick={() => remove(field.name)}
                        />
                      </div>
                    );
                  })}

                  {/* Only show Add button if less than 3 variants */}
                  {canAddMore && (
                    <Button type="dashed" onClick={() => add()} block>
                      Add Variant
                    </Button>
                  )}

                  {/* Show error if no variants */}
                  {fields.length === 0 && (
                    <div className="text-red-500 text-sm mt-2">
                      Please add at least one variant
                    </div>
                  )}
                </div>
              );
            }}
          </Form.List>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit" className="bg-blue-600">
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default DrinkFormModal;
