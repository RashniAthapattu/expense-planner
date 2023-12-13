import React from 'react';
import { ExpensesData } from '../interfaces/expenses';
import { fetchExpenses } from '../services/expenses.service';

export default async function ExpenseTotal (){
	const expensesData: Promise<ExpensesData> = fetchExpenses();
	const expenses = await expensesData;
	//total amount = addition of all expenses
	const totalAmount = expenses.expenseData.reduce((total, expense) => total + expense.amount, 0);
	return (
		<div className='alert alert-primary'>
			<span>Spent so far: {totalAmount} LKR</span>
		</div>
	);
};