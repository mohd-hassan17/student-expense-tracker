'use client';

import { useEffect, useRef, useState } from 'react';

import { getTransactions, saveTransactions } from '@/services/storage';
import type { Transaction } from '@/types/transaction';

export function useTransactions(): {
  transactions: Transaction[];
  addTransaction: (newTransaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
} {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const hasSkippedInitialSave = useRef(false);

  // useEffect(() => {
  //   const loadTimer = window.setTimeout(() => {
  //     setTransactions(getTransactions());
  //   }, 0);

  //   return () => {
  //     window.clearTimeout(loadTimer);
  //   };
  // }, []);

  useEffect(() => {
  setTransactions(getTransactions());
}, []);

  useEffect(() => {
    if (!hasSkippedInitialSave.current) {
      hasSkippedInitialSave.current = true;
      return;
    }

    saveTransactions(transactions);
  }, [transactions]);

  const addTransaction = (newTransaction: Transaction) => {
    setTransactions((currentTransactions) => [newTransaction, ...currentTransactions]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions((currentTransactions) =>
      currentTransactions.filter((transaction) => transaction.id !== id)
    );
  };

  const totalIncome = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0);

  const netBalance = totalIncome - totalExpenses;

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    totalIncome,
    totalExpenses,
    netBalance,
  };
}
