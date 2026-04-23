# Planning: Fix Unit Tests, Coverage, and CORS

## Context
There are failing unit tests, coverage is not meeting expectations, and CORS behavior is problematic. This plan outlines high-level steps to address these areas.

## Goals
- All unit tests pass consistently.
- Coverage meets the agreed threshold.
- CORS works correctly for intended clients without introducing security risks.

## Scope
- Unit test fixes and missing tests for uncovered modules.
- Coverage improvements (no behavior changes unless required by tests).
- CORS configuration and related tests.

## High-Level Steps
1. **Baseline and audit**
   - Run existing unit tests and capture failures.
   - Check current coverage report and identify low-coverage files/modules.
   - Locate current CORS configuration and where it is applied (middleware or server setup).

2. **Fix unit tests**
   - Resolve failing tests by fixing test setup, mocks, and deterministic data.
   - Update or remove flaky tests after confirming root cause.
   - Ensure tests assert correct behavior, not implementation details.

3. **Improve coverage**
   - Add targeted tests for uncovered paths that represent real behavior.
   - Prioritize core business logic and error handling branches.
   - Re-run coverage to confirm threshold is met.

4. **Fix CORS**
   - Define allowed origins, methods, headers, and credentials policy.
   - Configure CORS to accept intended clients and reject others.
   - Add tests for preflight (OPTIONS) and main request flows.

5. **Regression verification**
   - Run full unit test suite and coverage again.
   - Verify no new failures and CORS tests pass.

## Acceptance Criteria
- Unit tests pass on a clean environment.
- Coverage meets the team target.
- CORS requests from allowed origins succeed; disallowed origins are blocked.
