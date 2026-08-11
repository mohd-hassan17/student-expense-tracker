import { ArrowDownRight, ArrowUpRight, Wallet } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatCurrency } from '@/utils/formatCurrency';
import { cn } from '@/lib/utils';

type SummaryCardsProps = {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
};

// This component presents the tracker totals in a quick, scannable dashboard summary.
export function SummaryCards({
  totalIncome,
  totalExpenses,
  netBalance,
}: SummaryCardsProps) {
  const summaryItems = [
    {
      title: 'Total Income',
      description: 'All money added to your budget',
      amount: totalIncome,
      accentClassName: 'border-l-4 border-l-emerald-500',
      amountClassName: 'text-emerald-600',
      icon: ArrowUpRight,
    },
    {
      title: 'Total Expenses',
      description: 'All spending recorded so far',
      amount: totalExpenses,
      accentClassName: 'border-l-4 border-l-rose-500',
      amountClassName: 'text-rose-600',
      icon: ArrowDownRight,
    },
    {
      title: 'Net Balance',
      description: 'What remains after expenses',
      amount: netBalance,
      accentClassName:
        netBalance >= 0 ? 'border-l-4 border-l-emerald-500' : 'border-l-4 border-l-rose-500',
      amountClassName: netBalance >= 0 ? 'text-emerald-600' : 'text-rose-600',
      icon: Wallet,
    },
  ] as const;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {summaryItems.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.title}
            className={cn(
              'rounded-2xl border border-border/70 bg-card/95 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
              item.accentClassName
            )}
          >
            <CardHeader className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="mt-1 text-sm leading-6">
                    {item.description}
                  </CardDescription>
                </div>
                <div className="rounded-xl border border-border/60 bg-muted/50 p-2 text-muted-foreground shadow-sm">
                  <Icon className="size-4" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p
                className={cn(
                  'tabular-nums text-2xl font-semibold tracking-tight sm:text-3xl',
                  item.amountClassName
                )}
              >
                {formatCurrency(item.amount)}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
