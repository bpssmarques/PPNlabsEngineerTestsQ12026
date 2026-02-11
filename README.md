# PPN Labs Developer Test 1 Template

This repository is the baseline for Test 1.

## Candidate workflow

1. Create branch `submission` from `main`.
2. Implement fixes for:
- `contracts/MiniVault.sol`
- `src/reconcile/computeUserPosition.ts`
- `src/graphql/schema.ts`
- `src/graphql/resolvers.ts`
3. Add `NOTES.md` (max 1 page) with required prompts.
4. Open one PR from `submission` into `main`.

## Setup

```bash
pnpm install
pnpm test
```

## Commands

- `pnpm test`
- `pnpm test:contracts`
- `pnpm test:unit`
- `pnpm test:graphql`
- `pnpm demo`

## Important

Forbidden edits are enforced in CI:
- `.github/workflows/**`
- `candidate-pack/**`
- baseline test files under `tests/**` and `contracts/test/**`

Allowed additions for extra tests:
- `tests/additional/**`
- `contracts/test/additional/**`
