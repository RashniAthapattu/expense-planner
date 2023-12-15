import { IDeleteAmounts } from "../interfaces/deleteAmounts";

export async function deleteAmount(data:IDeleteAmounts) {
  await fetch(`http://localhost:4000/${data.type}/${data.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data}),
  })
}
