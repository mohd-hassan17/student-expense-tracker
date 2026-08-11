# AI Usage Log

## AI Tools Used

- **OpenAI Codex** — used as the primary coding assistant to generate the initial implementation of the data layer, UI components, and dashboard wiring from detailed requirements and architectural constraints.
- **Claude (Anthropic)** — used for architecture review, code review, debugging discussions, and validation of implementation decisions before submission.

## Key Prompts Used

**Data layer** — requested `types/transaction.ts`, `utils/formatCurrency.ts`, `utils/validators.ts`, `services/storage.ts`, and `hooks/useTransactions.ts` in one pass, with explicit requirements: SSR-safe `localStorage` access (`typeof window === 'undefined'` guards), immutable state updates (spread for adding, `filter` for deleting — no mutation), derived totals computed via `.filter().reduce()` rather than stored as separate state, and a `useRef` flag to prevent the persistence effect from overwriting saved data with an empty array before the initial load completes.

**Components** — requested `SummaryCards`, `TransactionForm`, `TransactionList`, `TransactionItem`, and `EmptyState`, each scoped to props/callbacks only (no direct `localStorage` or global state access), using shadcn primitives for inputs/buttons/cards, with inline form validation and visible hover/active states on interactive elements.

**Wiring** — requested `app/page.tsx` to compose the `useTransactions` hook with the components above, with no business logic living in the page itself — the page only wires state to UI.

## Challenges / Bugs Resolved with AI Help

- The load `useEffect` in `useTransactions.ts` initially wrapped `setTransactions(getTransactions())` in an unnecessary `setTimeout(..., 0)`. I reviewed this with Claude and confirmed that `useEffect` with an empty dependency array already only runs client-side after mount — the timeout added a redundant delay with no benefit, so I removed it.
- Resolved a React controlled/uncontrolled component issue in `TransactionForm.tsx`. The generated shadcn `Select` components were switching between `undefined` and string values, causing React warnings. I updated the form state to remain controlled throughout the component lifecycle and adjusted the TypeScript types accordingly.

## Structural Modifications I Made to AI Output

- Removed the unnecessary `setTimeout` wrapper described above from the load effect.
- Reviewed and confirmed the `useRef`-based "skip first save" guard in `useTransactions.ts` actually does what it's meant to: without it, the persistence effect would fire on the very first render (before storage has loaded) and overwrite previously saved data with an empty array. The ref flag skips exactly that one run.
- Verified `services/storage.ts` is the only file that touches `localStorage` directly — confirmed no component bypasses it, across all five UI components.
- Manually tested the full flow: added an income entry, added an expense entry, deleted a transaction, refreshed the page to confirm persistence survives a reload, and resized the browser to mobile width to confirm the responsive layout holds up.
- Refactored the transaction form types to separate form state from the persisted `Transaction` model. The form stores `amount` as a string for controlled input handling, while validation converts it to a number before creating a transaction.
- Fixed TypeScript type mismatches and controlled/uncontrolled state issues in shadcn `Select` components to ensure stable React behavior and clean type checking.