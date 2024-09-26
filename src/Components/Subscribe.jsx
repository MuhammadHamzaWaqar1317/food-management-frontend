import { Button, Checkbox, Form, Input, Select } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { subscribeUser } from "../Redux/Thunks/subscribeApi";
import { constant } from "../constants/constant";
import { tokenData } from "../Utils/decodeToken";
import styles from "../Styles/subscribe.module.css";

function Subscribe() {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const handleSubmit = (body) => {
    body = { ...body, status: "Subscribed" };
    console.log(body);
    dispatch(subscribeUser(body));

    form.resetFields();
    setFormfields();
  };

  const setFormfields = () => {
    const { email, level, name } = tokenData();
    form.setFields([
      {
        name: "name",
        value: name,
      },
      {
        name: "email",
        value: email,
      },
      {
        name: "level",
        value: level,
      },
    ]);
  };

  useEffect(() => {
    setFormfields();
  }, []);

  return (
    <>
      <div className={styles.main_wrapper}>
        <div className={styles.container}>
          <h1 className={styles.header_h1}>Meal Subscription</h1>
          <Form
            form={form}
            requiredMark={false}
            onFinish={handleSubmit}
            layout="vertical"
            className={styles.form}
          >
            <Form.Item
              label="Name"
              name={"name"}
              required
              className={styles.text}
              rules={[
                { required: true, message: "Please input your Name" },
                {
                  pattern: new RegExp(/^[a-zA-Z]+(-[a-zA-Z]+)*$/),
                  message: "field does not any special characters ",
                },
              ]}
            >
              <Input readOnly placeholder="Enter Name"></Input>
            </Form.Item>
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
              <Input readOnly placeholder="Enter email"></Input>
            </Form.Item>

            <Form.Item
              label="Level"
              name={"level"}
              required
              className={styles.text}
              rules={[{ required: true, message: "Please Select a Level" }]}
            >
              <Select
                disabled={true}
                placeholder="Select Level"
                options={[
                  {
                    value: "0",
                    label: "Level 0",
                  },
                  {
                    value: "1",
                    label: "Level 1",
                  },
                  {
                    value: "2",
                    label: "Level 2",
                  },
                  {
                    value: "3",
                    label: "Level 3",
                  },
                  {
                    value: "4",
                    label: "Level 4",
                  },
                  {
                    value: "5",
                    label: "Level 5",
                  },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Meal Time"
              name={"mealTime"}
              required
              className={styles.text}
              rules={[{ required: true, message: "Please Select a Meal Time" }]}
            >
              <Checkbox.Group
                options={[constant.lunch, constant.dinner]}
                className={styles.text_inner}
              />
            </Form.Item>
            <p className={styles.meal_text}>
              *Select meal time according to your shift
            </p>
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

export default Subscribe;
