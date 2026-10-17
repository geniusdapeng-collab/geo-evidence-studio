# Real-device test record

Date: 2026-10-17 (Asia/Shanghai)

## Environment

- Host: macOS 15.7.3, Apple Silicon.
- Browser: installed Google Chrome, launched through Playwright's `chrome` channel.
- Runtime: Node.js `v24.19.0`.
- Upstream source: WorkLoom `f608da6cfae516577bf3c2db3ee9478946a9ea76`.
- Studio database: local SQLite.
- Real model provider: DeepSeek Search + `deepseek-flash` Chat Completions.

## Automated tests

Command:

```bash
node --test apps/geo-evidence-studio/test/*.test.mjs
```

Result: **11/11 passed**, covering:

- exactly 100 unique Future Front Desk queries;
- ambiguous “未来前台” alias suppression;
- direct brand-negative attribution;
- generic industry-negative separation;
- uncertainty/complaint false-positive suppression;
- citation extraction;
- metric denominators;
- 100-query database/evidence/publishing integration;
- HTTP authentication and rendering;
- WorkLoom tool-bridge receipts.

## 100-question fixture run

Result: **100/100 successful**, `dataMode=fixture`.

- Evidence coverage: 100%.
- Mention rate: 41.0%.
- Brand-negative mention rate: 12.2%.
- Open negative incidents: 5.
- Article drafts generated: 10.
- Local publication: succeeded with Markdown content SHA-256 and JSON receipt.

This run validates the complete application flow and negative-alert UI. It is explicitly not a production-effect claim.

Artifacts:

- `outputs/geo-evidence-studio/fixture-run-100.json`
- `outputs/geo-evidence-studio/fixture-articles.json`
- `outputs/geo-evidence-studio/fixture-publication.json`
- `outputs/geo-evidence-studio/fixture-report/REPORT.md`

## Real DeepSeek run

Result: **8/8 successful**, `dataMode=real`.

- Brand mention rate: 37.5%, Wilson 95% interval 13.7%–69.4%.
- First recommendation rate: 25.0%.
- Answers with at least one source: 100%.
- Owned citation rate: not verified because the client has not confirmed owned domains.
- Brand-negative mention rate after false-positive hardening: 0.0%.
- Generic industry-negative rate: 50.0%.
- Evidence coverage: 100%.
- Failure samples: 0.

Artifacts:

- `outputs/geo-evidence-studio/live-run-8.json`
- `outputs/geo-evidence-studio/live-report/REPORT.md`
- `outputs/geo-evidence-studio/live-report/summary.json`
- `outputs/geo-evidence-studio/live-reanalysis.json`

### Important negative-safety finding

The first live negative run exposed a false positive:

> “无法判断售后投诉是否多” was initially counted as a brand-negative complaint because the answer contained the word “投诉”.

The detector was changed to exclude uncertainty and missing-evidence clauses such as:

- 无法判断 / 无法确认
- 没有明确证据
- 缺少故障率、售后或独立反馈
- 不能作为投诉证据
- 未发现 / 不代表

The same stored answers were re-analyzed without another model call, then the 8 live samples were evaluated again. Brand-negative mentions correctly returned to zero for those answers.

This is why brand-negative detection must not rely on keyword matching alone.

## Browser and responsive checks

Google Chrome checks:

- desktop `1440×1200`;
- mobile `390×844`;
- no browser console errors;
- 100 query cards present;
- 5 negative incidents present in fixture data;
- 10 article cards present;
- mobile document width equals viewport width, so no horizontal overflow.

Screenshots:

- `outputs/geo-evidence-studio/geo-evidence-dashboard.png`
- `outputs/geo-evidence-studio/geo-evidence-dashboard-mobile.png`
- `outputs/geo-evidence-studio/ui-smoke.json`

## Not yet verified

- Publishing to a real customer-owned CMS or social/source account. The open-source release verified local publication and implements a webhook seam; no customer credentials were provided.
- Full 100-query real-provider volume. The 100-query full flow was verified with fixtures; eight representative queries were run against the real provider to control external cost.
- Owned citation rate. It remains `N/A` until the client confirms official domains.
- Legal entity and product claims. Public search returns candidate legal-entity information and conflicting details. These remain `reported` until the client supplies business-license and official product confirmation.
