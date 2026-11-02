import React from "react";
import AmountItem from "./AmountItem";
import { ExpensesData } from "../interfaces/expenses";
import { fetchExpenses } from "../services/expenses.service";

export default async function ExpenseList() {
  const expenses: ExpensesData = await fetchExpenses();
  return (
    <ul className="list-group">
      {expenses.expenseData.map((expense) => (
        <AmountItem
          key={expense._id}
          id={expense._id}
          type="expense"
          description={expense.description}
          amount={expense.amount}
        />
      ))}
    </ul>
  );
}
