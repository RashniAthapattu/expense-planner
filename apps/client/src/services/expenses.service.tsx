import { API_URL } from "../config";

export async function fetchExpenses() {
  const res = await fetch(`${API_URL}/expense`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("failed to fetch data");
  return res.json();
}
