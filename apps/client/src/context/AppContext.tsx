import React, { createContext, useContext, useEffect, useState } from 'react';

interface Expense{
    date: Date;
    description: string;
    amount: string;
    category: string;
}

interface Earning{
    date: Date;
    description: string;
    amount: string;
    category: string;
}

interface ExpenseContextType {
    expenses: Expense[];
    addExpense: (expense: Expense) => void;
    getExpenses: () => void;
  }