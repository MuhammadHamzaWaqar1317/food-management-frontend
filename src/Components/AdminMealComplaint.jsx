import { Button, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addressMealComplaint,
  fetchMealComplaints,
} from "../Redux/Thunks/mealComplaintApi";
function AdminMealComplaint() {
  const tableData = useSelector((state) => state.mealComplaintSlice.tableData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMealComplaints());
  }, []);

  const columns = [
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Complain Nature",
      dataIndex: "complainNature",
      key: "complainNature",
    },
    {
      title: "Actions",
      dataIndex: "email",
      render: (_, record) => (
        <Button
          ghost
          type="primary"
          onClick={() => dispatch(addressMealComplaint({ id: record._id }))}
        >
          Resolve
        </Button>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        rowKey={(record) => record._id}
        style={{ width: "100%", overflow: "auto", paddingBottom: "100px" }}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.complainDescription}</p>
          ),
        }}
        dataSource={tableData}
      />
    </>
  );
}

export default AdminMealComplaint;
