export interface Expense {
    _id: string;
    description: string;
    amount: number;
    date: string;
    category: string;
    __v: number;
}

export interface ExpensesData {
    message: string;
    expenseData: Expense[];
}
