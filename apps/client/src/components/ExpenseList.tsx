import React from 'react'
import ExpenseItem from './ExpenseItem';
import { ExpensesData } from '../interfaces/expenses';
import { fetchExpenses } from '../services/expenses.service';

export default async function ExpenseList (){
	const expensesData: Promise<ExpensesData> = fetchExpenses();
	const expenses = await expensesData;
    return (
		<ul className='list-group'>
			{expenses.expenseData.map((expense) => (
				<ExpenseItem key={expense._id} description={expense.description} amount={expense.amount} _id={expense._id}  __v={0} />
			))}
		</ul>
    )
}
