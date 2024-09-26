import { Button, Checkbox, DatePicker, Form, Input } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { additionalMeal } from "../Redux/Thunks/additionalMealApi";
import { constant } from "../constants/constant";
import styles from "../Styles/adminadditonalmeal.module.css";
import { showError } from "../Components/Toaster";

function AdminAdditionalMeal() {
  const { TextArea } = Input;
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const handleFinish = (body) => {
    const date = body.date.format("YYYY-MM-DD");
    const regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/);
    const email = body.mealEmail.split(",");
    let validateEmail = false;

    email.forEach((item) => {
      if (!regex.test(item)) {
        validateEmail = true;
        return showError(`${item} is not a valid Email`);
      }
    });

    if (validateEmail) {
      return;
    }

    const mealObj = email.map((item) => {
      return {
        name: "guest",
        email: item,
        level: "0",
        mealTime: body.mealTime,
        date,
      };
    });
    dispatch(additionalMeal(mealObj));

    form.resetFields();
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.H1Meal}>Additional Meal Request</h1>
          <Form
            requiredMark={false}
            form={form}
            layout="vertical"
            className={styles.form}
            onFinish={handleFinish}
          >
            <Form.Item
              label="Date"
              name={"date"}
              rules={[{ required: true, message: "Please select a Date" }]}
            >
              <DatePicker className={styles.datepicker} />
            </Form.Item>

            <Form.Item
              label="Meal Time"
              name={"mealTime"}
              className={styles.text}
              rules={[{ required: true, message: "Please select a Meal Time" }]}
            >
              <Checkbox.Group
                options={[constant.lunch, constant.dinner]}
                className={styles.text_inner}
              />
            </Form.Item>

            <Form.Item
              label="Email"
              className={styles.email}
              name={"mealEmail"}
              rules={[{ required: true, message: "Please Enter Email" }]}
            >
              <TextArea placeholder="Enter Email" className={styles.textArea} />
            </Form.Item>

            <Form.Item>
              <p className={styles.belowTextArea}>
                *Enter comma separated email in case of multiple mails{" "}
              </p>
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

export default AdminAdditionalMeal;
