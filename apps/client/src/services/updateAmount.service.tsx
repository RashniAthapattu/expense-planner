import { IUpdateAmounts } from "../interfaces/updateAmounts";

export async function updateAmount(data:IUpdateAmounts) {
    await fetch(`http://localhost:4000/${data.type}/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }