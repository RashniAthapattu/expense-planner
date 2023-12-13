export interface Earning {
    _id: string;
    description: string;
    amount: number;
    date: string;
    category: string;
    __v: number;
}

export interface EarningsData {
    message: string;
    expenseData: Earning[];
}
