import { Button, Checkbox, DatePicker, Form, Input, Radio } from "antd";
import moment from "moment";
import React, { useState } from "react";
import styles from "../Styles/adminskipmeal.module.css";

import { useDispatch } from "react-redux";
import { skipEveryone, skipUserMeal } from "../Redux/Thunks/skipMealApi";
import { constant } from "../constants/constant";
function AdminSkipMeal() {
  const dispatch = useDispatch();

  const [renderPicker, setRenderPicker] = useState("onePerson");
  const [renderDate, setRenderDate] = useState(1);
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();

  const radioChange = (e) => {
    console.log(e.target.value);
    setRenderPicker(e.target.value);
  };

  const radioChangeDate = (e) => {
    setRenderDate(e.target.value);
  };

  const getDatesBetween = (startDate, endDate) => {
    const start = moment(startDate);
    const end = moment(endDate);
    const dates = [];

    let current = start.clone();

    while (current <= end) {
      dates.push(current.format("YYYY-MM-DD"));
      current.add(1, "days");
    }

    return dates;
  };

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
  const onFinish = (body) => {
    console.log(body);
    const { personSkip, lunch } = body;
    if (!personSkip) {
      return;
    }

    if (personSkip == "onePerson") {
      const date = returnDate(body.date);
      body = { ...body, date };
      console.log(date, "Inside return date");
      console.log(body, "After Date");

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
    } else {
      // const date = Array.isArray(returnDate(body.date))
      //   ? returnDate(body.date)
      //   : [returnDate(body.date)];
      const date = [returnDate(body.date)];

      const obj = {
        date,
        mealTime: lunch,
      };
      console.log(obj);
      dispatch(skipEveryone(obj));

      form.resetFields();
    }
  };
  const disabledDate = (current) => {
    return current && current < moment().startOf("day");
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.skipMeal}>Skip Meal for</h1>
          <Form
            form={form}
            requiredMark={false}
            layout="vertical"
            className={styles.form}
            onFinish={onFinish}
          >
            <Form.Item
              name={"personSkip"}
              required
              className={styles.radioGrp}
              rules={[{ required: true, message: "Please select any option" }]}
              // style={{ position: "relative" }}
            >
              <Radio.Group onChange={radioChange} value={renderPicker}>
                <Radio value={"onePerson"} className={styles.text_inner}>
                  One Person
                </Radio>
                <Radio value={"everyone"} className={styles.text_inner}>
                  Everyone
                </Radio>
              </Radio.Group>
            </Form.Item>

            {renderPicker == "onePerson" && (
              <Form.Item
                label="Email"
                name={"email"}
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
            )}
            <Form.Item
              label="Skip Meal for"
              name={"mealskip"}
              className={styles.text}
              rules={[{ required: true, message: "Please select any option" }]}
            >
              <Radio.Group onChange={radioChangeDate} value={renderDate}>
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
              rules={[{ required: true, message: "Please select a Date" }]}
            >
              {renderDate == 1 ? (
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
              className={styles.text}
              rules={[{ required: true, message: "Please select a Meal Time" }]}
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
    </>
  );
}

export default AdminSkipMeal;
