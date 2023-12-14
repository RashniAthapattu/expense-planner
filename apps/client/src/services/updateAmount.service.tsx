export async function updateExpense(type: string, _id: string, description: string, amount: number) {
    await fetch(`http://localhost:4000/${type}/${_id}`, {
      method: 'UPDATE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description,
        amount,
      }),
    });
  }