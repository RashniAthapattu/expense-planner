"use client";
import React, { useEffect, useState } from "react";
import { Earning, EarningsData } from "../interfaces/earnings";
import Modal from "./updatePopup";
import { updateAmount } from "../services/updateAmount.service";
import { deleteAmount } from "../services/deleteAmount.service";
import { fetchEarning } from "../services/earning.service";
import { ExpensesData } from "../interfaces/expenses";
import { fetchExpenses } from "../services/expenses.service";
import ModalDelete from "./deletePopup";

export default function EarningItem(props: Earning) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(1);
  const [type, setType] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    setDescription(props.description);
    setAmount(props.amount);
    setId(props._id);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const submitData = { description, amount, type, id };

    try {
      console.log(submitData, "this is submitData");
      const UpdateAmountData: Promise<any> = updateAmount(submitData);
      const res = await UpdateAmountData;
      console.log(res.message, "this is res");
      if (res.message === "Earning has been successfully updated") {
        const earningData: Promise<EarningsData> = fetchEarning();
        const earnings = await earningData;
      } else if (res.message === "Expense has been successfully updated") {
        const expensesData: Promise<ExpensesData> = fetchExpenses();
        const expenses = await expensesData;
      }
    } catch (error) {
      console.log(error, "error");
    }
    setDescription("");
    setAmount(0);
    setType("");
    setId("");
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();
    const submitData = { description, amount, type, id };

    try {
      console.log(submitData, "this is submitData");
      const DeleteAmountData: Promise<any> = deleteAmount(submitData);
      const res = await DeleteAmountData;
      console.log(res.message, "this is res");
      if (res.message === "Earning deleted successfully") {
        const earningData: Promise<EarningsData> = fetchEarning();
        const earnings = await earningData;
      } else if (res.message === "Expense deleted successfully") {
        const expensesData: Promise<ExpensesData> = fetchExpenses();
        const expenses = await expensesData;
      }
    } catch (error) {
      console.log(error, "error");
    }
    setDescription("");
    setAmount(0);
    setType("");
    setId("");
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              className="form-control"
              id="amount"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <input
              type="text"
              className="form-control"
              id="type"
              placeholder="Enter type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-outline-primary mt-3">
            Save
          </button>
        </form>
      </Modal>
      <ModalDelete isOpen={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <form onSubmit={handleDelete}>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <label htmlFor="description">{description}</label>
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <label htmlFor="amount">{amount}</label>
          </div>
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <input
              type="text"
              className="form-control"
              id="type"
              placeholder="Enter type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-outline-primary mt-3">
            Save
          </button>
        </form>
      </ModalDelete>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        {props.description}
        <div>
          <label className="mr-3">{props.amount} LKR</label>
          <button
            className="btn btn-sm btn-outline-success m-2"
            onClick={() => setModalOpen(true)}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => setModalOpen(true)}
          >
            Delete
          </button>
        </div>
      </li>
    </>
  );
}
