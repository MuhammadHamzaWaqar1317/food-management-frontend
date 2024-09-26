import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Popover,
  Row,
  Select,
  Table,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import mealObj from "../Modules/MealTag";
import styles from "../Styles/adminemployee.module.css";
import { constant } from "../constants/constant";

import { useDispatch, useSelector } from "react-redux";
import {
  dropDownFilterEmployee,
  fetchEmployeeData,
  handleEmployeeSubscription,
} from "../Redux/Thunks/employeeDataApi";
import { skipUserMeal } from "../Redux/Thunks/skipMealApi";
function AdminEmployee() {
  const successMsg = useSelector(
    (state) => state.employeeDataSlice.successMessage
  );
  const data = useSelector((state) => state.employeeDataSlice.data);

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(fetchEmployeeData());
  }, []);

  console.log(successMsg, "successMsg");

  function PopOverContent({ employeeId, setDisplaypopover }) {
    const [form] = Form.useForm();

    const subscribeUser = (body) => {
      console.log("subUser", body);

      body = { ...body, employeeId, status: "Subscribed" };

      dispatch(handleEmployeeSubscription(body));
      form.resetFields();
      setDisplaypopover(false);
    };

    return (
      <>
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          className={styles.form}
          onFinish={subscribeUser}
        >
          <Form.Item
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

          <Form.Item>
            <Button
              style={{ marginRight: "5px" }}
              onClick={() => setDisplaypopover(false)}
              className={styles.btn}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.popOverSub}
            >
              Subscribe
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }

  function PopOverComponent({ record }) {
    const [displayPopover, setDisplaypopover] = useState(false);

    const handleUnsubscribe = (employeeId, mealTime) => {
      const obj = {
        employeeId,
        status: "Unsubscribed",
        mealTime,
      };
      dispatch(handleEmployeeSubscription(obj));
    };

    const handleOpenChange = () => {
      setDisplaypopover(false);
    };
    return (
      <>
        {record.status == "Subscribed" ? (
          <>
            <Button type="link" onClick={() => handleSkip(record)}>
              skip
            </Button>
            <Button
              type="link"
              onClick={() =>
                handleUnsubscribe(record.employeeId, record.mealTime)
              }
            >
              Unsubscribe
            </Button>
          </>
        ) : (
          <Popover
            content={
              <PopOverContent
                employeeId={record.employeeId}
                setDisplaypopover={setDisplaypopover}
              />
            }
            title="Meal Time"
            trigger="click"
            open={displayPopover}
            onOpenChange={handleOpenChange}
          >
            <Button type="link" onClick={() => setDisplaypopover(true)}>
              Subscribe
            </Button>
          </Popover>
        )}
      </>
    );
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Company Cont.",
      dataIndex: "companyContDollar",
      key: "companyContDollar",
    },
    {
      title: "Employee Cont.",
      dataIndex: "empContDollar",
      key: "empContDollar",
    },
    {
      title: "Meal",
      key: "mealTime",
      dataIndex: "mealTime",
      render: (_, { mealTime }) => (
        <>
          {mealTime?.map((tag) => {
            let color = mealObj.dinner;
            if (tag === constant.lunch) {
              color = mealObj.lunch;
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <PopOverComponent record={record} />
        </>
      ),
    },
  ];

  const { Search } = Input;

  const handleFinish = (body) => {
    const { level, mealTime, status } = body;

    const objLevel = {
      "Level 0": "0",
      "Level 1": "1",
      "Level 2": "2",
      "Level 3": "3",
      "Level 4": "4",
      "Level 5": "5",
    };

    const Level = !level || level == "ALL" ? false : objLevel[level];
    const MealTime = !mealTime || mealTime == "ALL" ? false : mealTime;
    const Status = !status ? false : status;
    const obj = new URLSearchParams({
      level: Level,
      mealTime: MealTime,
      status: Status,
    });
    dispatch(dropDownFilterEmployee(obj));
  };

  const systemDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const start = `${year}-${month}-${day}`;
    const end = `${year}-${month}-${day}`;

    console.log(start, "start");
    const arr = [];
    arr.push({ start, end });
    return arr;
  };

  const handleSkip = (record) => {
    const { mealTime, email } = record;

    const obj = {
      1: {
        lunch: mealTime[0] == constant.lunch ? systemDate() : [],
        dinner: mealTime[0] == constant.dinner ? systemDate() : [],
        email,
      },
    };

    const body = obj[mealTime.length] || {
      lunch: systemDate(),
      dinner: systemDate(),
      email,
    };

    dispatch(
      skipUserMeal({
        body,
        successMsg: "Meal Skipped Successfully",
        errorMsg: "Failed to Skip Meal",
      })
    );
  };

  const onSearch = (value) => {
    if (value.trim().length == 0) {
      return;
    }
    const obj = new URLSearchParams({
      search: value.trim(),
    });

    dispatch(dropDownFilterEmployee(obj));
  };

  const handleReset = () => {
    form.resetFields();
    dispatch(fetchEmployeeData());
  };

  const handleChange = (e) => {
    if (e.target.value.trim().length == 0) {
      dispatch(fetchEmployeeData());
    }
  };
  return (
    <>
      <div className={styles.main}>
        <Row
          justify={"center"}
          style={{ marginLeft: "6px", marginRight: "8px" }}
        >
          <Col xl={12} lg={16} md={16}>
            <Search
              placeholder="Enter Name or Email"
              allowClear
              enterButton="Search"
              size="large"
              className={styles.search}
              onSearch={onSearch}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Divider></Divider>

        <Form
          form={form}
          layout="inline"
          className={styles.form}
          onFinish={handleFinish}
        >
          <Row
            justify={"start"}
            style={{ width: "100%", marginLeft: "6px", marginRight: "0px" }}
            gutter={[0, 20]}
          >
            <Col xl={6} xs={12}>
              <Form.Item label="Level" name={"level"} className={styles.text}>
                <Select
                  allowClear
                  className={styles.selectText}
                  placeholder="Select"
                  options={[
                    {
                      value: "Level 0",
                      label: "Level 0",
                    },
                    {
                      value: "Level 1",
                      label: "Level 1",
                    },
                    {
                      value: "Level 2",
                      label: "Level 2",
                    },
                    {
                      value: "Level 3",
                      label: "Level 3",
                    },
                    {
                      value: "Level 4",
                      label: "Level 4",
                    },
                    {
                      value: "Level 5",
                      label: "Level 5",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xl={6} xs={12}>
              <Form.Item label="Meal" name={"mealTime"} className={styles.text}>
                <Select
                  allowClear
                  className={styles.selectText}
                  placeholder="Select"
                  options={[
                    {
                      value: constant.lunch,
                      label: "Lunch",
                    },
                    {
                      value: constant.dinner,
                      label: "Dinner",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xl={6} xs={12}>
              <Form.Item label="Status" name={"status"} className={styles.text}>
                <Select
                  allowClear
                  className={styles.selectText}
                  placeholder="Select"
                  options={[
                    {
                      value: "Subscribed",
                      label: "Subscribed",
                    },
                    {
                      value: "Unsubscribed",
                      label: "Unsubscribed",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xl={3} md={5} xs={6}>
              <Form.Item>
                <Button block onClick={handleReset} className={styles.btn}>
                  Reset
                </Button>
              </Form.Item>
            </Col>

            <Col xl={3} md={5} xs={6}>
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
            </Col>
          </Row>
        </Form>
        <Divider></Divider>
        <div className={styles.tableemployee}>
          <Table
            className={styles.table}
            columns={columns}
            dataSource={data}
            style={{ width: "100%", overflow: "auto" }}
          ></Table>
        </div>
        <Modal
          title="Item does not exits"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        ></Modal>
      </div>
    </>
  );
}

export default AdminEmployee;
