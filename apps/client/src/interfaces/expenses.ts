export interface Expense {
    _id: string;
    description: string;
    amount: number;
    __v: number;
}

export interface ExpensesData {
    message: string;
    expenseData: Expense[];
}
