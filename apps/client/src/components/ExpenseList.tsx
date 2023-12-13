import React from 'react'
import ExpenseItem from './ExpenseItem';
import { fetchEarning } from '../services/earning.service';
import { ExpensesData } from '../interfaces/expenses';
import { fetchExpenses } from '../services/expenses.service';

export default async function ExpenseList (){
	const expensesData: Promise<ExpensesData> = fetchExpenses();
	const expenses = await expensesData;
    return (
		<ul className='list-group'>
			{expenses.map((expense) => (
				<ExpenseItem key={expense.id} name={expense.name} cost={expense.cost} />
			))}
		</ul>
    )
}
