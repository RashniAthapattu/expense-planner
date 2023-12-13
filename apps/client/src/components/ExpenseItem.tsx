import React from "react";
import { TiDelete } from "react-icons/ti";
import { ExpensesData } from "../interfaces/expenses";
import { fetchExpenses } from "../services/expenses.service";

export default async function ExpenseItem() {
  const expensesData: Promise<ExpensesData> = fetchExpenses();
  const expenses = await expensesData;
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      { expenses.expenseData.map}
      <div>
        <label className="mr-3">{props.cost} LKR</label>
        <TiDelete size="1.5em"></TiDelete>
      </div>
    </li>
  );
}

