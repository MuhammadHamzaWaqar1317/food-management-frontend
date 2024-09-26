import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import styles from "../Styles/signin.module.css";
import { signInThunk } from "../Redux/Thunks/authApi";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function SignIn() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (body) => {
    body = { ...body, navigate };
    dispatch(signInThunk(body));
  };

  return (
    <>
      <div className={styles.main_wrapper}>
        <div className={styles.container}>
          <h1 className={styles.header_h1}>Sign In</h1>
          <p className={styles.signIn_text}>
            Enter your details to sign in to your account
          </p>
          <Form
            form={form}
            requiredMark={false}
            onFinish={handleSubmit}
            layout="vertical"
            className={styles.form}
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
              label="Password"
              name={"password"}
              required
              className={styles.text}
              rules={[
                { required: true, message: "Please input your password" },
              ]}
            >
              <Input.Password placeholder="Enter password"></Input.Password>
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
            <p className={styles.signIn_text}>
              Don’t Have an Account? <NavLink to="/signup">Sign Up</NavLink>
            </p>
          </Form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
