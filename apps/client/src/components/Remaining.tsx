import React from 'react';
import { ExpensesData } from '../interfaces/expenses';
import { fetchExpenses } from '../services/expenses.service';
import { EarningsData } from '../interfaces/earnings';
import { fetchEarning } from '../services/earning.service';

export default async function Remaining (){
	const expensesData: Promise<ExpensesData> = fetchExpenses();
	const expenses = await expensesData;
	const earningData: Promise<EarningsData> = fetchEarning();
	const earnings = await earningData;
	//total earnings - addition of all expenses
	const remainingAmount = (earnings.earningData.reduce((total, earning) => total + earning.amount, 0)-(expenses.expenseData.reduce((total, expense) => total + expense.amount, 0)));
	
	return (
		<div className='alert alert-success'>
			<span>Remaining: {remainingAmount} LKR</span>
		</div>
	);
};
