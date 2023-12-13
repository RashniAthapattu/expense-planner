export default async function ExpenseTotal (){
	const expensesData: Promise<> = fetchExpenses();
	const expenses = await expensesData;