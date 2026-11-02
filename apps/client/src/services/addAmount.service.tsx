import { API_URL } from "../config";
import { AmountType } from "../interfaces/addAmounts";

export async function addAmount(
  type: AmountType,
  data: { description: string; amount: number }
) {
  const res = await fetch(`${API_URL}/${type}/addAmount`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Failed to add amount");
  return res.json();
}
