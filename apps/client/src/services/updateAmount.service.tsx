import { API_URL } from "../config";
import { IUpdateAmounts } from "../interfaces/updateAmounts";

export async function updateAmount({ type, id, description, amount }: IUpdateAmounts) {
  const res = await fetch(`${API_URL}/${type}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description, amount }),
  });
  if (!res.ok) throw new Error("Failed to update amount");
  return res.json();
}
