import React from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import styles from "../Styles/signup.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { signUpThunk } from "../Redux/Thunks/authApi";
import { useDispatch } from "react-redux";
function SignUp() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (body) => {
    body = { ...body, navigate };
    dispatch(signUpThunk(body));
  };
  return (
    <>
      <div className={styles.main_wrapper}>
        <div className={styles.container}>
          <h1 className={styles.header_h1}>Sign Up</h1>
          <p className={styles.signUp_text}>
            Enter your details to create your account
          </p>
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
              <Input placeholder="Enter Name"></Input>
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
              <Input placeholder="Enter email"></Input>
            </Form.Item>

            <Form.Item
              label="Password"
              name={"password"}
              required
              className={styles.text}
              rules={[
                { required: true, message: "Please input your password" },
              ]}
            >
              <Input.Password placeholder="Enter email"></Input.Password>
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
            <p className={styles.signUp_text}>
              Already have Account? <NavLink to="/">Sign In</NavLink>
            </p>
          </Form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
