"use client";
import { useState, useEffect } from "react";
import { ExpensesData } from "../interfaces/expenses";
import { fetchExpenses } from "../services/expenses.service";
import { fetchEarning } from "../services/earning.service";
import { EarningsData } from "../interfaces/earnings";
import { addAmount } from "../services/addAmount.service";
// import { useRouter } from "next/router";

interface DropdownProps {
  onSelectChange: (selectedValue: string) => void;
}

export default function AddAmountForm() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(1);
  const [type, setType] = useState("expenses");

  // const router = useRouter();
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const submitData = { description, amount, type };
    const finalData = { description, amount };

    try {
      console.log(submitData);
      const AmountData: Promise<any> = addAmount(submitData.type, finalData);
      const res = await AmountData;
      console.log(res);
      if (res.ok) {
        // router.reload();
        if (submitData.type === "earning") {
          const earningData: Promise<EarningsData> = fetchEarning();
          const earnings = await earningData;
        } else {
          const expensesData: Promise<ExpensesData> = fetchExpenses();
          const expenses = await expensesData;
        }
      } else {
        console.log("Oops! Something is wrong.");
      }
    } catch (error) {
      console.log(error);
    }
    setDescription("");
    setAmount(0);
    setType("expenses");
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setType(newValue);
    console.log(type);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Description</label>
          <input
            required
            type="text"
            name="description"
            value={description}
            placeholder="Enter the description"
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-sm">
          <label htmlFor="amount">Amount</label>
          <input
            required
            type="number"
            name="amount"
            value={amount}
            placeholder="Enter the amount"
            onChange={(e) => setAmount(parseInt(e.target.value))}
          ></input>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-sm">
          <label htmlFor="expenseType">Select Type:</label>
          <select id="expenseType" value={type} onChange={handleSelectChange}>
          <option value="expenses">Expenses</option>
            <option value="earnings">Earnings</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          <button type="submit" className="btn btn-outline-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
