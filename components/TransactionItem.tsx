'use client';

import { Trash2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Transaction } from '@/types/transaction';
import { formatCurrency } from '@/utils/formatCurrency';

type TransactionItemProps = {
  transaction: Transaction;
  onDelete: (id: string) => void;
};

const transactionDateFormatter = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

// This component renders one transaction row with its details and delete action.
export function TransactionItem({ transaction, onDelete }: TransactionItemProps) {
  const isIncome = transaction.type === 'income';
  const formattedAmount = `${isIncome ? '+' : '-'}${formatCurrency(transaction.amount)}`;
  const formattedDate = transactionDateFormatter.format(new Date(transaction.date));

  return (
    <Card
      className={cn(
        'rounded-2xl border border-border/70 bg-card/95 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
        isIncome ? 'border-l-4 border-l-emerald-500' : 'border-l-4 border-l-rose-500'
      )}
    >
      <CardContent className="py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1 space-y-2">
            <h3 className="truncate text-base font-semibold tracking-tight text-foreground">
              {transaction.description}
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Badge
                variant="outline"
                className="rounded-full border-border/70 bg-muted/50 px-2.5 py-1 text-[0.75rem] font-medium"
              >
                {transaction.category}
              </Badge>
              <span>{formattedDate}</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <p
              className={cn(
                'min-w-[8.5rem] text-left text-base font-semibold tabular-nums sm:text-right',
                isIncome ? 'text-emerald-600' : 'text-rose-600'
              )}
            >
              {formattedAmount}
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onDelete(transaction.id)}
              aria-label={`Delete ${transaction.description}`}
              className="h-9 rounded-xl border-border/70 text-muted-foreground transition-colors duration-200 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 active:bg-rose-100"
            >
              <Trash2 className="size-4" />
              <span className="hidden sm:inline">Delete</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
