import React, { useEffect } from "react";
import { Table, Button, Tag } from "antd";

import { useSelector, useDispatch } from "react-redux";
import { align } from "@progress/kendo-drawing";
import { DeleteOutlined } from "@ant-design/icons";
import {
  deleteSkipMealDates,
  getSkipMealDates,
} from "../Redux/Thunks/skipMealApi";
import mealObj from "../Modules/MealTag";
import { constant } from "../constants/constant";
import styles from "../Styles/userskipMealDate.module.css";

function UserSkipMealDate() {
  const tableData = useSelector(
    (state) => state.skipMealSlice.userSkipMealDates
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSkipMealDates());
  }, []);

  console.log(tableData);

  const columns = [
    { title: "Start Date", dataIndex: "start", key: "start" },
    { title: "End Date", dataIndex: "end", key: "end" },
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
                deleteSkipMealDates({
                  _id: record._id,
                  mealTime: record.mealTime,
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

  return (
    <>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>Meal Skips</h1>

        <Table
          columns={columns}
          rowKey={(record) => record._id}
          style={{ width: "100%", overflow: "auto", paddingBottom: "100px" }}
          dataSource={tableData}
        />
      </div>
    </>
  );
}

export default UserSkipMealDate;
