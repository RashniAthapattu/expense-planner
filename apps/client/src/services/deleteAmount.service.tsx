import { API_URL } from "../config";
import { IDeleteAmounts } from "../interfaces/deleteAmounts";

export async function deleteAmount({ type, id }: IDeleteAmounts) {
  const res = await fetch(`${API_URL}/${type}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete amount");
  return res.json();
}
