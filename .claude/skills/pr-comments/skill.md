---
name: pr-comments
description: Address unresolved review comments on a pull request. Analyses each comment, determines if it's a real problem, makes fixes where needed, replies to the comment, and resolves the thread. Use when the user runs `/pr-comments` or asks to address PR review comments.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# PR Comments Skill

## Purpose

Address unresolved review comments on a GitHub pull request. For each comment thread, analyse the feedback, determine if it identifies a real problem, make fixes where appropriate, reply to the comment with a clear explanation, and resolve the thread.

## When to Use

Invoke when:
- User runs `/pr-comments` command
- User asks to "address PR comments", "handle review feedback", or "resolve PR comments"

## Arguments

Takes an optional argument: the PR number.

If no PR number is provided, detect it from the current branch:
```bash
gh pr view --json number --jq '.number'
```

Example usage:
```
/pr-comments
/pr-comments 76
```

## Workflow

### 1. Identify the PR

Determine the PR number either from the argument or the current branch:

```bash
# If no argument provided, get PR for current branch
gh pr view --json number --jq '.number'
```

If no PR is found, inform the user:
> No pull request found for the current branch. Please provide a PR number: `/pr-comments {number}`

### 2. Fetch Unresolved Review Threads

Use the GitHub GraphQL API to get all unresolved review threads with their comments:

```bash
gh api graphql -f query='
{
  repository(owner: "OWNER", name: "REPO") {
    pullRequest(number: PR_NUMBER) {
      reviewThreads(first: 100) {
        nodes {
          id
          isResolved
          line
          path
          comments(first: 50) {
            nodes {
              id
              body
              author { login }
              createdAt
              path
              line
              diffHunk
            }
          }
        }
      }
    }
  }
}'
```

Extract the repository owner and name from the git remote:
```bash
gh repo view --json owner,name --jq '"\(.owner.login)/\(.name)"'
```

Filter to only unresolved threads (`isResolved == false`).

If there are no unresolved threads, inform the user:
> No unresolved review comments found on PR #{number}. All threads are resolved.

### 3. Process Each Thread

For each unresolved review thread, follow this process:

#### a. Understand the Context

1. **Read the comment** — understand what the reviewer is asking or flagging
2. **Read the diff hunk** — the `diffHunk` field shows the code context around the comment
3. **Read the full file** — read the file at the path indicated by the comment to understand the broader context
4. **Read the full thread** — if there are multiple comments in the thread, read them all to understand the conversation

#### b. Analyse the Comment

Determine the nature of the comment:

- **Bug / real problem** — the reviewer has identified a genuine issue (incorrect logic, missing handling, typo, inconsistency, etc.)
- **Suggestion / improvement** — the reviewer suggests a better approach that has merit
- **Question / clarification** — the reviewer is asking for clarification, not necessarily flagging a problem
- **Incorrect / not applicable** — the reviewer has misunderstood the code or the comment doesn't apply (e.g. the reviewer is wrong about what the code does)
- **Style / nitpick** — minor style preferences that don't affect correctness

#### c. Take Action

Based on the analysis:

**If it's a real problem or valid suggestion:**
1. Make the fix in the relevant file(s) using Edit/Write tools
2. Reply to the comment explaining what was changed and why
3. Resolve the thread

**If it's a question or clarification request:**
1. Reply with a clear explanation addressing the question
2. Resolve the thread

**If the comment is incorrect or not applicable:**
1. Reply politely explaining why the current code is correct or why the suggestion doesn't apply
2. Provide specific reasoning referencing the code
3. Resolve the thread

**If it's a minor style nitpick:**
1. Make the change if it's trivial and improves readability
2. If not worth changing, reply explaining the rationale for the current approach
3. Resolve the thread

#### d. Reply to the Comment

Use the GitHub REST API to reply to the review comment:

```bash
gh api repos/{owner}/{repo}/pulls/{pr_number}/comments/{comment_id}/replies \
  -f body='Your reply message here'
```

The `comment_id` is the numeric ID of the **first comment** in the thread (the root comment). Use the REST API comment ID, not the GraphQL node ID.

To get the REST API comment ID, fetch it alongside the GraphQL data or use:
```bash
gh api repos/{owner}/{repo}/pulls/{pr_number}/comments --jq '.[] | {id, path, line, body: (.body[:80])}'
```

#### e. Resolve the Thread

Use the GitHub GraphQL API to resolve the review thread:

```bash
gh api graphql -f query='
mutation {
  resolveReviewThread(input: { threadId: "THREAD_NODE_ID" }) {
    thread {
      isResolved
    }
  }
}'
```

The `THREAD_NODE_ID` is the GraphQL `id` of the review thread (e.g. `PRRT_kwDOQ3G5WM5xUZTd`).

### 4. Commit Fixes (if any changes were made)

If any files were modified to address comments:

1. Stage the changed files
2. Commit with a descriptive message:
   ```
   Address PR review comments

   - [Brief description of each fix]
   ```
3. Push to the remote branch

### 5. Summary

After processing all threads, provide a summary to the user:

> Processed {n} review comment(s) on PR #{number}:
> - {x} fixed (code changes made)
> - {y} clarified (replied with explanation)
> - {z} dismissed (comment was incorrect/not applicable)
>
> {If changes were made: "Changes committed and pushed."}

## Reply Guidelines

**Tone:**
- Be concise and direct
- Be respectful — assume good intent from the reviewer
- Explain your reasoning when disagreeing
- Reference specific code or lines when explaining

**When agreeing / fixing:**
> Good catch — fixed. [Brief description of what was changed.]

> Makes sense. Updated to [description of change].

**When clarifying:**
> This is intentional because [reason]. [Further explanation if needed.]

**When disagreeing:**
> The current approach is correct here because [specific reason]. [Reference to code/docs if helpful.]

**Do NOT:**
- Be defensive or dismissive
- Write long essays — keep replies to 1-3 sentences
- Mention AI, Claude, or automation in replies
- Leave comments unresolved without replying

## Error Handling

**Cannot determine repo owner/name:**
> Could not determine the repository. Make sure you're in a git repository with a GitHub remote.

**GraphQL API errors:**
> Failed to fetch review threads. Make sure you have the right permissions and the PR number is correct.

**Cannot resolve thread (permissions):**
> Could not resolve thread — you may not have permission. The reply has been posted; please resolve manually.
