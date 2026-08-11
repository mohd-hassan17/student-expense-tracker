'use client';

import { SummaryCards } from '@/components/SummaryCards';
import { TransactionForm } from '@/components/TransactionForm';
import { TransactionList } from '@/components/TransactionList';
import { useTransactions } from '@/hooks/useTransactions';

export default function Home() {
  const {
    transactions,
    addTransaction,
    deleteTransaction,
    totalIncome,
    totalExpenses,
    netBalance,
  } = useTransactions();

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,rgba(248,250,252,1)_0%,rgba(255,255,255,1)_36%,rgba(248,250,252,1)_100%)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <header className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Student Expense &amp; Budget Tracker
          </p>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Track spending, income, and balance in one clean dashboard
            </h1>
            <p className="max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
              Add transactions, review your latest activity, and keep a simple view of how
              your monthly budget is moving.
            </p>
          </div>
        </header>

        <section aria-label="Budget summary">
          <SummaryCards
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            netBalance={netBalance}
          />
        </section>

        <section
          aria-label="Transaction dashboard"
          className="grid grid-cols-1 gap-6 md:grid-cols-[380px_1fr] md:items-start"
        >
          <div className="lg:sticky lg:top-6">
            <TransactionForm onAddTransaction={addTransaction} />
          </div>
          <TransactionList
            transactions={transactions}
            onDeleteTransaction={deleteTransaction}
          />
        </section>
      </div>
    </main>
  );
}
