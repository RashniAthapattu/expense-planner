"use client";
import React from "react";
import { Expense } from "../interfaces/expenses";

export default async function ExpenseItem(props: Expense) {
  // const [description, setDescription] = useState(props.description);
  // const [amount, setAmount] = useState(props.amount);
  // const [isEditing, setIsEditing] = useState(false);

  const updateData = (e: React.FormEvent) => {
  e.preventDefault();
  // const submitData = { description, amount, type };
  // const finalData = { description, amount };
  // const UpdateAmountData: Promise<any> = UpdateAmountData(submitData.type, finalData);
  // const res = await UpdateAmountData;
  }

  const deleteData = (e: React.FormEvent) => {
  e.preventDefault();
  }
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {props.description}
      <div>
        <label className="mr-3">{props.amount} LKR</label>
        <button className="btn btn-sm btn-outline-success m-2" onClick={updateData}>Edit</button>
        <button className="btn btn-sm btn-outline-danger" onClick={deleteData}>Delete</button>
      </div>
    </li>
  );
}

