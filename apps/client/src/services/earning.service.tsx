import { API_URL } from "../config";

export async function fetchEarning() {
  const res = await fetch(`${API_URL}/earning`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("failed to fetch data");
  return res.json();
}
