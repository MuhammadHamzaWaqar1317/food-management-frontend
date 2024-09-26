import { Form, Input, Modal as AntdModal, InputNumber } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
function Modal({
  mapFormItem,
  open,
  setOpen,
  title,
  editCont,
  setEditCont,
  contValue,
  updateContApi,
  price,
  setPrice,
  updateMealPriceApi,
}) {
  const [form] = useForm();

  if (editCont) {
    console.log("EditCont");
    form.setFields([
      {
        name: "companyContPercent",
        value: contValue[0],
      },
      {
        name: "empContPercent",
        value: contValue[1],
      },
    ]);
    setEditCont(false);
  }

  const setContFields = (CompanyName, EmpName, value1, value2) => {
    form.setFields([
      {
        name: CompanyName,
        value: value1,
      },
      {
        name: EmpName,
        value: value2,
      },
    ]);
  };

  const handleChange = (name) => {
    const CompanyContValue = form.getFieldValue([["companyContPercent"]]);
    const EmpContValue = form.getFieldValue([["empContPercent"]]);

    if (name == "companyContPercent") {
      setContFields(
        "companyContPercent",
        "empContPercent",
        CompanyContValue,
        100 - CompanyContValue
      );
    }

    if (name == "empContPercent") {
      setContFields(
        "companyContPercent",
        "empContPercent",
        100 - EmpContValue,
        EmpContValue
      );
    }
  };

  const handleFinish = (body) => {
    if (price) {
      updateMealPriceApi(body);
      setPrice(false);
      setOpen(false);
    } else {
      const { companyContPercent, empContPercent } = body;

      const apiBody = {
        companyContPercent: companyContPercent / 100,
        empContPercent: empContPercent / 100,
      };

      updateContApi(apiBody);
      handleCancel();
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  return (
    <>
      <AntdModal
        open={open}
        title={title}
        onOk={() => form.submit()}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={handleFinish}>
          {mapFormItem.map((item) => (
            <Form.Item name={item.name} label={item.label} rules={item.rules}>
              <Input
                onChange={() => handleChange(item.name)}
                type="number"
                min={item.fieldValue.min}
                max={item.fieldValue.max}
              />
            </Form.Item>
          ))}
        </Form>
      </AntdModal>
    </>
  );
}

export default Modal;
