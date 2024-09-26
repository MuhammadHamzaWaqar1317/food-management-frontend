import { Button, DatePicker, Form, Input, Select } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import styles from "../Styles/mealcomplaint.module.css";

import { useDispatch } from "react-redux";
import { tokenData } from "../Utils/decodeToken";
import { createMealComplaint } from "../Redux/Thunks/mealComplaintApi";

function MealComplaint() {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const complaintOptions = [
    {
      value: "Food Quality",
      label: "Food Quality",
    },
    {
      value: "Food Quantity",
      label: "Food Quantity",
    },
    {
      value: "Food Menu",
      label: "Food Menu",
    },
    {
      value: "Taste & Flavour",
      label: "Taste & Flavour",
    },
    {
      value: "Suggestion",
      label: "Suggestion",
    },
    {
      value: "Others",
      label: "Others",
    },
  ];

  const setFormfields = () => {
    const { email } = tokenData();
    form.setFields([
      {
        name: "email",
        value: email,
      },
    ]);
  };

  useEffect(() => {
    setFormfields();
  }, []);

  const handleFinish = (body) => {
    const date = moment(body.data);

    const complainDescription = !body.complainDescription
      ? ""
      : body.complainDescription;
    body = {
      ...body,
      date: date.format("YYYY-MM-DD"),
      status: "unResolve",
      complainDescription,
    };

    dispatch(createMealComplaint(body));
    form.resetFields();
    setFormfields();
  };

  return (
    <>
      <div className={styles.main_wrapper}>
        <div className={styles.container}>
          <h1 className={styles.mealComplaint}>Meal Complaint</h1>
          <Form
            requiredMark={false}
            layout="vertical"
            className={styles.form}
            onFinish={handleFinish}
            form={form}
          >
            <Form.Item
              label="Email"
              name={"email"}
              required
              className={styles.text}
              rules={[
                { required: true, message: "Please input your Email" },
                {
                  type: "email",
                },
              ]}
            >
              <Input placeholder="Enter email"></Input>
            </Form.Item>

            <Form.Item
              label="Date"
              name={"date"}
              rules={[{ required: true, message: "Please select a Date" }]}
            >
              <DatePicker className={styles.datepicker} />
            </Form.Item>

            <Form.Item
              label="Nature of Complaint"
              name={"complainNature"}
              rules={[
                {
                  required: true,
                  message: "Please select Nature of Complaint",
                },
              ]}
            >
              <Select
                placeholder="Choose an Option"
                options={complaintOptions}
              />
            </Form.Item>

            <Form.Item label="Details" name={"complainDescription"}>
              <TextArea placeholder="Optional" />
            </Form.Item>

            <Form.Item>
              <Button
                block
                type="primary"
                htmlType="submit"
                className={styles.btn}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

export default MealComplaint;
