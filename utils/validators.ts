import type { Transaction } from '@/types/transaction';

export type TransactionFormValues = {
  description: string;
  amount: string;
  type: Transaction['type'] | '';
  category: string;
};

// This keeps transaction form checks centralized before data is saved or displayed.
export function validateTransaction(form: TransactionFormValues): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};
  const description = form.description.trim();
  const category = form.category.trim();
  const amount = Number(form.amount);

  if (!description) {
    errors.description = 'Description is required.';
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    errors.amount = 'Amount must be a valid number greater than 0.';
  }

  if (form.type !== 'income' && form.type !== 'expense') {
    errors.type = 'Type must be either income or expense.';
  }

  if (!category) {
    errors.category = 'Category is required.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
