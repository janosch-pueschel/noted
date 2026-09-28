# Code Review

Review only the uncommitted Git diff of the files explicitly provided by the user.

Use the Git diff to identify what has changed.

Use the rest of the file and codebase only as context for understanding the changes.

Evaluate the changes against the applicable project rules.

Focus on:

- correctness and potential bugs
- type safety
- error handling
- maintainability and readability
- unnecessary complexity
- duplicated logic
- consistency with the existing codebase

For each finding:

1. State the severity: `critical`, `warning`, or `suggestion`.
2. Reference the relevant file and changed code.
3. Explain what the problem is.
4. Explain why it matters.
5. Suggest a concrete improvement.

Do not modify any files.
Do not review unchanged code unless it directly causes a problem with the changed code.