async function deleteExpense(type: string, _id: string) {
    await fetch(`http://localhost:4000/${type}/${_id}`, {
      method: 'DELETE',
    });
  }
