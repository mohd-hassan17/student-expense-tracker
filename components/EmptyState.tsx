import { WalletCards } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

// This component gives the tracker a clear empty state when no transactions exist yet.
export function EmptyState() {
  return (
    <Card className="rounded-2xl border border-dashed border-border/70 bg-card/90 shadow-sm">
      <CardContent className="flex flex-col items-center justify-center px-6 py-16 text-center sm:px-10 sm:py-20">
        <div className="mb-5 rounded-2xl border border-border/60 bg-muted/60 p-4 text-muted-foreground shadow-sm">
          <WalletCards className="size-7" />
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          No transactions yet
        </h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          Add your first income or expense to start tracking your student budget with a
          clean, real-time overview.
        </p>
      </CardContent>
    </Card>
  );
}
