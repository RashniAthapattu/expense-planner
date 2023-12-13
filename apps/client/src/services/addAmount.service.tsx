import { IAddAmounts } from "../interfaces/addAmounts";

export async function addAmount(data: IAddAmounts) {
    const res = await fetch(`http://localhost:4000/expense/addAmount`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!res.ok) throw new Error('failed to add data');
    return res.json();
  }