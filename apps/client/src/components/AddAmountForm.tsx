"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addAmount } from "../services/addAmount.service";
import { AmountType } from "../interfaces/addAmounts";

export default function AddAmountForm() {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(1);
  const [type, setType] = useState<AmountType>("expense");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      await addAmount(type, { description, amount });
      setDescription("");
      setAmount(1);
      // Re-render the server components so the totals and lists update
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Could not save the entry. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="description">Description</label>
          <input
            required
            type="text"
            id="description"
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
            min={1}
            id="amount"
            name="amount"
            value={amount}
            placeholder="Enter the amount"
            onChange={(e) => setAmount(Number(e.target.value))}
          ></input>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-sm">
          <label htmlFor="amountType">Select Type:</label>
          <select
            id="amountType"
            value={type}
            onChange={(e) => setType(e.target.value as AmountType)}
          >
            <option value="expense">Expenses</option>
            <option value="earning">Earnings</option>
          </select>
        </div>
      </div>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
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
