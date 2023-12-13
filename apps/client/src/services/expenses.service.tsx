export async function fetchExpenses() {
    const res = await fetch(`http://localhost:4000/expense`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('failed to fetch data');
    return res.json();
  }