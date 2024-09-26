import React, { useEffect } from "react";
import { Table, Tag, Button } from "antd";
import styles from "../Styles/userskipMealDate.module.css";
import { getAllSkipMealDates } from "../Redux/Thunks/skipMealApi";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import mealObj from "../Modules/MealTag";
import { constant } from "../constants/constant";
import { deleteSingleSkipMealEveryone } from "../Redux/Thunks/skipMealApi";
function AdminAllMealSkips() {
  const dispatch = useDispatch();
  const tableData = useSelector(
    (state) => state.skipMealSlice.allMealSkipDates
  );

  useEffect(() => {
    dispatch(getAllSkipMealDates());
  }, []);

  const columns = [
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
      render: (_, { mealTime }) => {
        let color = mealObj.dinner;
        if (mealTime === constant.lunch) {
          color = mealObj.lunch;
        }
        return (
          <>
            <Tag color={color}>{mealTime.toUpperCase()}</Tag>
          </>
        );
      },
    },
    {
      title: "Delete",
      dataIndex: "email",
      // align: "center",
      render: (_, record) => (
        <Button
          ghost
          danger
          onClick={
            () =>
              dispatch(
                deleteSingleSkipMealEveryone({
                  skipDateId: record._id,
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
        <h1 className={styles.heading}>All Meal Skips</h1>

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

export default AdminAllMealSkips;
