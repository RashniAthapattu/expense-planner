import React from "react";
import { TiDelete } from "react-icons/ti";
import { Expense } from "../interfaces/expenses";

export default async function ExpenseItem(props: Expense) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {props.description}
      <div>
        <label className="mr-3">{props.amount} LKR</label>
        <TiDelete size="1.5em"></TiDelete>
      </div>
    </li>
  );
}
