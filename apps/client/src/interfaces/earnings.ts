export interface Earning {
    _id: string;
    description: string;
    amount: number;
    __v: number;
}

export interface EarningsData {
    message: string;
    earningData: Earning[];
}
