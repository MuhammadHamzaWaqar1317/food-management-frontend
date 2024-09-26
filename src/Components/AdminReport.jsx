import { pdf } from "@progress/kendo-drawing";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Table,
  Tag,
} from "antd";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import mealObj from "../Modules/MealTag";
import { dropDownFilter, fetchMealRecord } from "../Redux/Thunks/mealRecordApi";
import styles from "../Styles/adminreport.module.css";
import { getDate, getMonth, getYear } from "../Utils/date";
import { constant } from "../constants/constant";
import { todayDate } from "../Utils/date";
import { key } from "localforage";

const { exportPDF, PDFOptions } = pdf;
function AdminReport() {
  const data = useSelector((state) => state.mealRecordSlice.data);
  const employeeCont = useSelector(
    (state) => state.mealRecordSlice.employeeCont
  );
  const companyCont = useSelector((state) => state.mealRecordSlice.companyCont);
  const grandTotal = useSelector((state) => state.mealRecordSlice.grandTotal);

  const [activateDateRequiredMark, setActivateDateRequiredMark] =
    useState(false);
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchMealRecord());
  }, []);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
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
          {mealTime.map((tag) => {
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
  ];

  const { Search } = Input;

  const handleFinish = (body) => {
    console.log(body);
    let { rangeStart, rangeEnd, mealTime } = body;

    if (!rangeStart || !rangeEnd) {
      rangeStart = todayDate();

      rangeEnd = todayDate();
    } else {
      rangeStart = rangeStart.format("YYYY-MM-DD");

      rangeEnd = rangeEnd.format("YYYY-MM-DD");
    }
    console.log(rangeStart, rangeEnd);

    const params = new URLSearchParams({ rangeStart, rangeEnd, mealTime });
    dispatch(dropDownFilter(params));
  };

  const onSearch = (value) => {
    if (value.trim().length == 0) {
      return;
    }
    const obj = new URLSearchParams({
      search: value.trim(),
    });
    handleFinish({ search: value.trim() });

    dispatch(dropDownFilter(obj));
  };
  const handleReset = () => {
    form.resetFields();
    dispatch(fetchMealRecord());
    setActivateDateRequiredMark(false);
  };
  const handleChangeSearch = (e) => {
    if (e.target.value.trim().length == 0) {
      dispatch(fetchMealRecord());
    }
  };

  const onPDFExportClicked = (e) => {
    console.log(data);

    const doc = new jsPDF();

    const header = () => {
      doc.setFontSize(18);
      doc.setTextColor(24, 144, 255);
      doc.text("Employee Report", 105, 25, { align: "center" });
    };
    const footer = () => {
      doc.setFontSize(10);
      doc.text("©Sofit Consultancy", 15, doc.internal.pageSize.height - 10, {
        align: "left",
      });
    };
    const tableColumn = [
      "Date",
      "Name",
      "Email",
      "Level",
      "Company Cont.",
      "Employee Cont.",
      "Meal",
    ];
    const tableRows = [];

    data.forEach((item) => {
      const {
        mealTime,
        name,
        email,
        level,
        empContDollar,
        companyContDollar,
        date,
      } = item;
      const itemData = [
        date,
        name,
        email,
        level,
        companyContDollar,
        empContDollar,
        mealTime[0],
      ];
      tableRows.push(itemData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      didDrawPage: function (data) {
        console.log(data);
        if (data.pageNumber == 1) {
          header();
        }
        footer();
      },
    });

    const finalY = doc.lastAutoTable.finalY;
    const string = `Company Cont: ${companyCont}          Employee Cont: ${employeeCont}           Grand Total: ${grandTotal}`;
    doc.setFontSize(13);

    doc.text(string, 20, finalY + 20);
    doc.save("employeeReport.pdf");
  };

  const startDisableDate = (current) => {
    return current > form.getFieldValue("rangeEnd");
  };

  const endDisableDate = (current) => {
    return current < form.getFieldValue("rangeStart");
  };

  const handleDateChange = () => {
    const rangeStart = form.getFieldValue("rangeStart");

    const rangeEnd = form.getFieldValue("rangeEnd");

    if (!rangeStart && !rangeEnd) {
      setActivateDateRequiredMark(false);
      form.setFieldsValue({
        rangeStart: undefined,
        rangeEnd: undefined,
      });
    } else if (!rangeStart) {
      form.setFieldsValue({
        rangeStart: undefined,
      });
      setActivateDateRequiredMark(true);
    } else if (!rangeEnd) {
      form.setFieldsValue({
        rangeEnd: undefined,
      });
      setActivateDateRequiredMark(true);
    }
  };
  return (
    <>
      <div className={styles.main}>
        <div className={styles.container}>
          <Row justify={"center"}>
            <Col xl={12} md={16} sm={15} xs={18}>
              <Search
                placeholder="Enter Name or Email"
                allowClear
                enterButton="Search"
                size="large"
                className={styles.search}
                onSearch={onSearch}
                onChange={handleChangeSearch}
              />
            </Col>
          </Row>
          <Divider></Divider>
          <Form
            layout="inline"
            requiredMark={false}
            className={styles.form}
            onFinish={handleFinish}
            form={form}
          >
            <Row
              justify={"start"}
              style={{ width: "100%", marginLeft: "6px", marginRight: "0px" }}
              gutter={[0, 20]}
            >
              <Col xl={6} xs={12}>
                <Form.Item
                  label="Start Date"
                  name="rangeStart"
                  onReset={() => console.log("it is reset")}
                  className={styles.colWithPadding}
                  rules={[
                    {
                      required: activateDateRequiredMark,
                      message: "Select Start Date",
                    },
                  ]}
                >
                  <DatePicker
                    onChange={handleDateChange}
                    className={styles.Datetext}
                    style={{ width: "100%" }}
                    disabledDate={startDisableDate}
                  />
                </Form.Item>
              </Col>
              <Col xl={6} xs={12}>
                <Form.Item
                  label="End Date"
                  name="rangeEnd"
                  className={styles.colWithPadding}
                  rules={[
                    {
                      required: activateDateRequiredMark,
                      message: "Select End Date",
                    },
                  ]}
                >
                  <DatePicker
                    disabledDate={endDisableDate}
                    onChange={handleDateChange}
                    className={styles.Datetext}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col xl={6} xs={12}>
                <Form.Item label="Meal" name="mealTime">
                  <Select
                    allowClear
                    onChange={(e) => console.log("select change", e)}
                    className={styles.selectText}
                    placeholder="ALL"
                    options={[
                      { value: "ALL", label: "ALL" },
                      { value: constant.lunch, label: "Lunch" },
                      { value: constant.dinner, label: "Dinner" },
                    ]}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col xl={3} md={5} xs={6}>
                <Form.Item>
                  <Button block className={styles.btn} onClick={handleReset}>
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
                    // className={styles.btnFilterSubmit}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Divider orientation="left"></Divider>
        </div>
        <div className={styles.tablereport}>
          <Table
            className={"tablereport"}
            id="tablefooter"
            columns={columns}
            dataSource={data}
            style={{ width: "100%", overflow: "auto" }}
            footer={() => (
              <div>
                <Form layout="inline" className={styles.footerForm}>
                  <Row gutter={[0, 20]} justify={"start"}>
                    <Col xl={7} md={12} xs={12}>
                      <Form.Item label="Company Cont :">
                        <Input
                          placeholder=""
                          value={companyCont}
                          readOnly
                          className={styles.footer_Input_Field}
                        />
                      </Form.Item>
                    </Col>

                    <Col xl={7} md={12} xs={12}>
                      <Form.Item label="Employee Cont : ">
                        <Input
                          placeholder=""
                          value={employeeCont}
                          readOnly
                          className={styles.footer_Input_Field}
                        />
                      </Form.Item>
                    </Col>
                    <Col xl={7} md={12} xs={12}>
                      <Form.Item label="Grand Total :">
                        <Input
                          placeholder=""
                          type="text"
                          value={grandTotal}
                          readOnly
                          className={styles.footer_Input_Field}
                        />
                      </Form.Item>
                    </Col>
                    <Col xl={3} md={5} xs={8}>
                      <Form.Item>
                        <Button
                          block
                          type="primary"
                          className={styles.footerbtn}
                          onClick={onPDFExportClicked}
                          ghost
                        >
                          Export
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            )}
          ></Table>
        </div>
      </div>
    </>
  );
}

export default AdminReport;
