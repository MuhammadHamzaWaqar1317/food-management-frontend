import { Button, Checkbox, DatePicker, Form, Input, Radio, Menu } from "antd";
import React, { useEffect } from "react";

import { useForm } from "antd/es/form/Form";
import moment from "moment";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { skipUserMeal } from "../Redux/Thunks/skipMealApi";
import { constant } from "../constants/constant";
import { tokenData } from "../Utils/decodeToken";
import styles from "../Styles/skipmeal.module.css";

function SkipMeal() {
  const dispatch = useDispatch();

  const [renderPicker, setRenderPicker] = useState(1);
  const { RangePicker } = DatePicker;
  const [form] = useForm();

  const radioChange = (e) => {
    console.log(e.target.value);
    setRenderPicker(e.target.value);
  };

  const setFormfields = () => {
    const { email, mealTime = [] } = tokenData();
    console.log(mealTime, "mealTime token");

    form.setFields([
      {
        name: "email",
        value: email,
      },
      {
        name: "lunch",
        value: mealTime.length != 2 ? mealTime : [],
      },
    ]);
  };

  useEffect(() => {
    setFormfields();
  }, []);

  const returnDate = (date) => {
    if (date.length == 2) {
      const start = date[0] ? date[0].format("YYYY-MM-DD") : null;
      const end = date[1] ? date[1].format("YYYY-MM-DD") : null;

      const dates = { start, end };
      return dates;
    } else {
      const start = date.format("YYYY-MM-DD");
      const end = date.format("YYYY-MM-DD");

      return { start, end };
    }
  };

  const handleFinish = (body) => {
    const date = returnDate(body.date);
    body = { ...body, date };

    if (body.mealskip == 2) {
      if (body.lunch.length === 2) {
        body = { ...body, lunch: [date], dinner: [date] };
      } else {
        const isLunch = body.lunch[0] === constant.lunch;
        const isDinner = body.lunch[0] === constant.dinner;

        body = {
          ...body,
          lunch: isLunch ? [date] : [],
          dinner: isDinner ? [date] : [],
        };
      }

      delete body.date;
    } else {
      if (body.lunch.length === 2) {
        body = { ...body, lunch: [date], dinner: [date] };
        console.log(body, "Convert string to Arrat string");
      }
      if (body.lunch[0] == constant.lunch) {
        body = { ...body, lunch: [date], dinner: [] };
      }
      if (body.lunch[0] == constant.dinner) {
        body = { ...body, lunch: [], dinner: [date] };
      }
      delete body.date;
    }

    console.log(body);

    dispatch(
      skipUserMeal({
        body,
        successMsg: "Record Created Successfully",
        errorMsg: "Failed to Create Record",
      })
    );
    form.resetFields();
    setFormfields();
  };
  const disabledDate = (current) => {
    return current && current < moment().startOf("day");
  };

  return (
    <>
      <div>
        <div className={styles.main_wrapper}>
          <div className={styles.container}>
            <h1 className={styles.skipMeal}>Skip Meal</h1>
            <Form
              form={form}
              requiredMark={false}
              layout="vertical"
              className={styles.form}
              onFinish={handleFinish}
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
                <Input readOnly placeholder="Enter email"></Input>
              </Form.Item>

              <Form.Item
                label="Skip Meal for"
                name={"mealskip"}
                required
                className={styles.text}
                rules={[
                  { required: true, message: "Please Select Skip Meal Time" },
                ]}
              >
                <Radio.Group onChange={radioChange} value={renderPicker}>
                  <Radio value={1} className={styles.text_inner}>
                    One Time
                  </Radio>
                  <Radio value={2} className={styles.text_inner}>
                    Multiple
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name={"date"}
                rules={[{ required: true, message: "Please Select a Date" }]}
              >
                {renderPicker == 1 ? (
                  <DatePicker
                    className={styles.datepicker}
                    disabledDate={disabledDate}
                  />
                ) : (
                  <RangePicker disabledDate={disabledDate} />
                )}
              </Form.Item>
              <Form.Item
                label="Meal Time"
                name={"lunch"}
                required
                className={styles.text}
                rules={[{ required: true, message: "Please Select Meal Time" }]}
              >
                <Checkbox.Group
                  options={[constant.lunch, constant.dinner]}
                  className={styles.text_inner}
                />
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
      </div>
    </>
  );
}

export default SkipMeal;
