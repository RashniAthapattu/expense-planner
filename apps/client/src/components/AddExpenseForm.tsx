'use client'

import React, { useState } from "react";
import { IAddAmounts } from "../interfaces/addAmounts";
import { zodResolver } from '@hookform/resolvers/zod';
import { addAmountSchema } from "../schema/addAmount.schema";
import { z } from "zod";
import { addAmount } from "../services/addAmount.service";
interface DropdownProps {
  onSelectChange: (selectedValue: string) => void;
}

const AddExpenseForm = ({ onSelectChange }: any) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    onSelectChange(newValue);
  };

  type IAddAmounts = z.infer<typeof addAmountSchema>; 

  const defaultValues: Partial<IAddAmounts> = {
	description: "",
	type: "earnings",
  };
  
  const form = useForm<IAddAmounts>({
    resolver: zodResolver(addAmountSchema),
    defaultValues,
  });

  async function onSubmit(data: IAddAmounts) {
	const earningsData: Promise<IAddAmounts> = addAmount(form);
	const earnings = await earningsData;
  }

  return (
	<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Description</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Amount</label>
          <input
            required
            type="text"
            className="form-control"
            id="cost"
          ></input>
        </div>
        <div className="col-sm mt-4">
          <label htmlFor="expenseType">Select Type:</label>
          <select
            id="expenseType"
            value={selectedValue}
            onChange={handleSelectChange}
          >
            <option value="earnings">Earnings</option>
            <option value="expenses">Expenses</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;

function useForm<T>(arg0: unknown) {
	throw new Error("Function not implemented.");
}