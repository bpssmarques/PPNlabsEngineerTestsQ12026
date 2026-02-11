<!-- CANDIDATE_TEST1.md -->

# PPN Labs — Engineering Take‑Home Test 1 (≈3 hours)
**Title:** MiniVault Correctness + Off‑chain Reconciliation + GraphQL (Apollo)  
**Timebox:** 3 hours (strict)  
**Submission:** GitHub Pull Request only

## 1) How to submit
1. You will receive a private GitHub repository link.
2. Create a branch named `submission`.
3. Push your changes to that branch.
4. Open a Pull Request into `main` titled: `Test 1 Submission — <Your Name>`.

**Important:** Reviewers will evaluate your PR using:
- PR diff
- GitHub Actions checks + logs
- the GitHub Actions Job Summary
- an uploaded CI artifact (`ppn-deliverables`)

Reviewers will **not** install or run your code locally, so CI must be green.

---

## 2) Rules & constraints (read carefully)
### Forbidden edits (do not change)
- `.github/workflows/**`
- `candidate-pack/**`
- Baseline tests under:
  - `tests/**`
  - `contracts/test/**`

If you want to add extra tests, only add new files under:
- `tests/additional/**`
- `contracts/test/additional/**`

### Allowed edits
- `src/**`
- `contracts/**` (excluding baseline tests)
- `NOTES.md` (you must create this)

---

## 3) What you are given
The repo includes:
- Solidity contract: `contracts/MiniVault.sol`
- Solidity tests: `contracts/test/**`
- Reconciliation stub: `src/reconcile/computeUserPosition.ts`
- Apollo GraphQL stubs:
  - `src/graphql/schema.ts`
  - `src/graphql/resolvers.ts`
- Candidate‑specific inputs (do not edit):
  - `candidate-pack/config.json`
  - `candidate-pack/fixtures.json`

---

## 4) What you need to do

### Task A — Fix the Solidity bug (required)
**File:** `contracts/MiniVault.sol`

There is exactly **one intentional correctness/security bug** related to share accounting (examples: mint/burn math, rounding, fee handling, missing checks, incorrect ordering). Fix it.

**Acceptance**
- `pnpm test:contracts` passes in GitHub Actions.

---

### Task B — Implement off‑chain reconciliation (required)
**File:** `src/reconcile/computeUserPosition.ts`

Implement:
```ts
export function computeUserPosition(
  user: string,
  fixtures: FixtureEvent[],
  config: CandidateConfig
): UserPosition;
