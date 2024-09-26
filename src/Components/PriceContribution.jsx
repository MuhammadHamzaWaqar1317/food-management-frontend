import { Button, Col, Row, Table } from "antd";
import React, { useEffect } from "react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPriceCont,
  updatePriceContribution,
  updateSingleMealPrice,
} from "../Redux/Thunks/priceContApi";
import styles from "../Styles/pricecontribution.module.css";
import editPen from "../assets/svg/editPen.svg";
import Modal from "./Modal";

function PriceContribution() {
  const [contributionId, setContributionId] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenPrice, setIsModalOpenPrice] = useState(false);

  const singleMealPrice = useSelector(
    (state) => state.priceContSlice.singleMealPrice
  );
  const tableData = useSelector((state) => state.priceContSlice.tableData);

  const dispatch = useDispatch();

  const [mapPriceForm, setMapPriceForm] = useState([
    {
      name: "singleMealPrice",
      label: "Single Meal Price",
      fieldValue: {
        min: 1,
        max: 1000,
      },
      rules: [
        {
          validator: (_, value) => {
            if (value <= 0) {
              console.log(value);
              return Promise.reject(
                new Error("Value must be between 0 and 1000")
              );
            } else if (value > 0 && value <= 1000) {
              return Promise.resolve();
            } else if (value > 1000) {
              return Promise.reject(
                new Error("Value must be between 0 and 1000")
              );
            } else {
              return Promise.reject(new Error("Please enter a value "));
            }
          },
        },
      ],
    },
  ]);
  const [price, setPrice] = useState(false);
  const contRules = {
    validator: (_, value) => {
      if (value < 0) {
        return Promise.reject(new Error("Value must be between 0 and 100"));
      }
      if (value > 100) {
        return Promise.reject(new Error("Value must be between 0 and 100"));
      }
      return Promise.resolve();
    },
  };
  const [cont, setCont] = useState([
    {
      name: "companyContPercent",
      label: "Company Cont. %",
      rules: [contRules],
      fieldValue: {
        min: 1,
        max: 100,
      },
    },
    {
      name: "empContPercent",
      label: "Employee Cont. %",
      rules: [contRules],
      fieldValue: {
        min: 0,
        max: 100,
      },
    },
  ]);

  const [ContTitle, setContTitle] = useState(null);
  const [editCont, setEditCont] = useState(false);
  const [ContValue, setContValue] = useState("");

  const columns = [
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Company Cont. %",
      dataIndex: "companyContPercent",
      key: "companyContPercent",
    },
    {
      title: "Employee Cont. %",
      dataIndex: "empContPercent",
      key: "empContPercent",
    },
    {
      title: "Company Cont. $",
      dataIndex: "companyContDollar",
      key: "companyContDollar",
    },
    {
      title: "Employee Cont. $",
      dataIndex: "empContDollar",
      key: "empContDollar",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => {
            console.log("cont Record ID", record);
            setContributionId(record._id);
            handleClick(
              record.level,
              record.companyContPercent,
              record.empContPercent
            );
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  const updateMealPriceApi = (body) => {
    dispatch(updateSingleMealPrice(body));
  };

  const handleEdit = () => {
    setIsModalOpenPrice(true);
    setPrice(true);
  };

  const updateContApi = (updatePercent) => {
    dispatch(updatePriceContribution({ ...updatePercent, contributionId }));
  };

  useEffect(() => {
    dispatch(fetchPriceCont());
  }, []);

  const handleClick = (level, companyContPercent, empContPercent) => {
    setIsModalOpen(true);
    setContTitle(level);
    setEditCont(true);
    setContValue([companyContPercent * 100, empContPercent * 100]);
  };

  return (
    <>
      <div className={styles.main}>
        <Row justify={"end"}>
          <Col xl={5} lg={8} md={8} xs={15}>
            <h4 className={styles.SMP}>
              Single Meal Price :{" "}
              <span className={styles.Rs_300}>
                Rs {singleMealPrice}{" "}
                <img
                  src={editPen}
                  alt=""
                  className={styles.edit_icon}
                  onClick={handleEdit}
                />
              </span>{" "}
            </h4>
          </Col>
        </Row>

        <Table
          dataSource={tableData}
          style={{ width: "100%", overflow: "auto" }}
          columns={columns}
          className={"table-report"}
          pagination={false}
          rowClassName="editable-row"
        ></Table>

        <Modal
          title="Set Meal Price"
          open={isModalOpenPrice}
          setOpen={setIsModalOpenPrice}
          mapFormItem={mapPriceForm}
          price={price}
          setPrice={setPrice}
          updateMealPriceApi={updateMealPriceApi}
        />

        <Modal
          title={ContTitle}
          setOpen={setIsModalOpen}
          open={isModalOpen}
          mapFormItem={cont}
          editCont={editCont}
          setEditCont={setEditCont}
          contValue={ContValue}
          updateContApi={updateContApi}
        />
      </div>
    </>
  );
}

export default PriceContribution;
