import React, { useEffect, useState } from "react";
import { Table, Tag, Button } from "antd";
import axios from "axios";
import { constant } from "../constants/constant";
import { DeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import styles from "../Styles/userskipMealDate.module.css";
import {
  viewEmployeeMealSkips,
  adminDeleteEmployeeMealSkipDate,
} from "../Redux/Thunks/skipMealApi";
import mealObj from "../Modules/MealTag";
function AdminViewMealSkips() {
  const dispatch = useDispatch();
  const tableData = useSelector(
    (state) => state.skipMealSlice.allEmployeesMealSkips
  );

  useEffect(() => {
    dispatch(viewEmployeeMealSkips());
  }, []);

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
  ];

  const innerTable = ({ employeeId }, mealSkipDates) => {
    console.log(mealSkipDates);

    const innerColumns = [
      {
        title: "Start Date",
        dataIndex: "start",
        key: "start",
      },
      {
        title: "End Data",
        dataIndex: "end",
        key: "end",
      },
      {
        title: "Meal Time",
        dataIndex: "mealTime",
        key: "mealTime",
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
        title: "Delete",
        dataIndex: "email",
        // align: "end",
        render: (_, record) => (
          <Button
            ghost
            danger
            onClick={
              () =>
                dispatch(
                  adminDeleteEmployeeMealSkipDate({
                    employeeId,
                    skipDateId: record._id,
                  })
                )
              /* dispatch(addressMealComplaint({ id: record._id })) */
            }
          >
            <DeleteOutlined color="red" />
          </Button>
        ),
      },
    ];
    console.log("ads");

    // console.log(record);
    return (
      <>
        <Table
          size="small"
          columns={innerColumns}
          rowKey={(record) => record._id}
          pagination={false}
          //   style={{ width: "100%", overflow: "auto", paddingBottom: "100px" }}
          dataSource={mealSkipDates}
        />
      </>
    );
  };
  // make API to fetch all subscribed user
  // Pass subscribed meal Array to function lunch and dinner or both
  // Render the array in expandable section
  return (
    <>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>Meal Skips</h1>
        <Table
          columns={columns}
          rowKey={(record) => record._id}
          style={{ width: "100%", overflow: "auto", paddingBottom: "100px" }}
          expandable={{
            expandedRowRender: (record) => innerTable(record, record.mealSkips),
          }}
          dataSource={tableData}
        />
      </div>
    </>
  );
}

export default AdminViewMealSkips;
