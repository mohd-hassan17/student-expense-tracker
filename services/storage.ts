import type { Transaction } from '@/types/transaction';

const STORAGE_KEY = 'student-expense-tracker:transactions';

// This loads persisted transactions so the app can restore the user's history.
export function getTransactions(): Transaction[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const storedTransactions = window.localStorage.getItem(STORAGE_KEY);

    if (!storedTransactions) {
      return [];
    }

    const parsedTransactions = JSON.parse(storedTransactions);

    return Array.isArray(parsedTransactions) ? (parsedTransactions as Transaction[]) : [];
  } catch (error) {
    console.error('Failed to read transactions from localStorage:', error);
    return [];
  }
}

// This saves transactions in one place so components never touch localStorage directly.
export function saveTransactions(transactions: Transaction[]): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const serializedTransactions = JSON.stringify(transactions);
    window.localStorage.setItem(STORAGE_KEY, serializedTransactions);
  } catch (error) {
    console.error('Failed to save transactions to localStorage:', error);
  }
}
