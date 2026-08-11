'use client';

import { type FormEvent, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Transaction } from '@/types/transaction';
import { validateTransaction } from '@/utils/validators';

type TransactionFormProps = {
  onAddTransaction: (transaction: Transaction) => void;
};

type TransactionFormValues = {
  description: string;
  amount: string;
  type: Transaction['type'] | '';
  category: string;
};

const CATEGORY_OPTIONS = [
  'Food',
  'Rent',
  'Salary',
  'Entertainment',
  'Utilities',
  'Transport',
  'Other',
] as const;

const INITIAL_FORM_VALUES: TransactionFormValues = {
  description: '',
  amount: '',
  type: '',
  category: '',
};

// This component collects and validates a new transaction before sending it upward.
export function TransactionForm({ onAddTransaction }: TransactionFormProps) {
  const [formValues, setFormValues] = useState<TransactionFormValues>(INITIAL_FORM_VALUES);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFieldChange = <K extends keyof TransactionFormValues>(
    field: K,
    value: TransactionFormValues[K]
  ) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    setErrors((currentErrors) => {
      if (!currentErrors[field]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = validateTransaction(formValues);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      description: formValues.description.trim(),
      amount: Number(formValues.amount),
      type: formValues.type as Transaction['type'],
      category: formValues.category.trim(),
      date: new Date().toISOString(),
    };

    onAddTransaction(newTransaction);
    setFormValues(INITIAL_FORM_VALUES);
    setErrors({});
  };

  return (
    <Card className="rounded-2xl border border-border/70 bg-card/95 shadow-sm">
      <CardHeader className="space-y-2">
        <CardTitle className="text-lg font-semibold tracking-tight">
          Add a transaction
        </CardTitle>
        <CardDescription className="max-w-2xl text-sm leading-6">
          Record income and expenses with clear categories to keep your student budget
          organized and easy to review.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          noValidate
          aria-busy={false}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="text"
                value={formValues.description}
                onChange={(event) => handleFieldChange('description', event.target.value)}
                placeholder="e.g. Monthly hostel rent"
                aria-invalid={Boolean(errors.description)}
                aria-describedby={errors.description ? 'description-error' : undefined}
                className="h-11 rounded-xl border-border/70 bg-background px-3 shadow-sm transition-colors"
              />
              {errors.description && (
                <p id="description-error" className="text-sm text-destructive">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                value={formValues.amount}
                onChange={(event) => handleFieldChange('amount', event.target.value)}
                placeholder="0.00"
                aria-invalid={Boolean(errors.amount)}
                aria-describedby={errors.amount ? 'amount-error' : undefined}
                className="h-11 rounded-xl border-border/70 bg-background px-3 shadow-sm transition-colors tabular-nums"
              />
              {errors.amount && (
                <p id="amount-error" className="text-sm text-destructive">
                  {errors.amount}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={formValues.type || undefined}
                onValueChange={(value) =>
                  handleFieldChange('type', value as TransactionFormValues['type'])
                }
              >
                <SelectTrigger
                  id="type"
                  aria-invalid={Boolean(errors.type)}
                  aria-describedby={errors.type ? 'type-error' : undefined}
                  className="h-11 w-full rounded-xl border-border/70 bg-background px-3 shadow-sm transition-colors"
                >
                  <SelectValue placeholder="Select transaction type" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border border-border/70 shadow-lg">
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p id="type-error" className="text-sm text-destructive">
                  {errors.type}
                </p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formValues.category || undefined}
                onValueChange={(value) => handleFieldChange('category', value)}
              >
                <SelectTrigger
                  id="category"
                  aria-invalid={Boolean(errors.category)}
                  aria-describedby={errors.category ? 'category-error' : undefined}
                  className="h-11 w-full rounded-xl border-border/70 bg-background px-3 shadow-sm transition-colors"
                >
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border border-border/70 shadow-lg">
                  {CATEGORY_OPTIONS.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p id="category-error" className="text-sm text-destructive">
                  {errors.category}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-muted-foreground">
              New transactions are added instantly and ready for auto-saving.
            </p>
            <Button
              type="submit"
              size="lg"
              className="h-11 w-full rounded-xl px-5 shadow-sm transition-colors duration-200 hover:bg-primary/90 active:translate-y-px active:bg-primary/95 sm:w-auto"
            >
              <span>Add Transaction</span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
