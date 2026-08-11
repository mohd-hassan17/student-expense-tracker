'use client';

import { EmptyState } from '@/components/EmptyState';
import { TransactionItem } from '@/components/TransactionItem';
import type { Transaction } from '@/types/transaction';

type TransactionListProps = {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
};

// This component switches between the empty state and the rendered transaction history.
export function TransactionList({
  transactions,
  onDeleteTransaction,
}: TransactionListProps) {
  if (transactions.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          onDelete={onDeleteTransaction}
        />
      ))}
    </div>
  );
}
