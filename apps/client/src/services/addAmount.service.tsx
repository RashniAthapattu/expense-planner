export async function addAmount(type: string, finalData: any) {

const res = await fetch(`http://localhost:4000/${type}/addAmount`, {
  method: "POST",
  body: JSON.stringify(finalData),
  headers: {
    "content-type": "application/json",
  },
});
}