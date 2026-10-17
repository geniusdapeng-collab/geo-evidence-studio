# Future Front Desk case

## Confirmed from the user requirement

- The client is referred to as **苏州未来前台**.
- The product category includes hotel self-service check-in machines.
- The required workflow is query design, article generation, publishing, mention/citation measurement and brand-negative monitoring.

## Candidate public research

Public search results associate the brand with **苏州未来前台人工智能科技有限公司** and an “AI智慧前台” product direction. These findings are stored as `reported` hypotheses, not confirmed client facts.

Sources used during the initial run:

- [央广网 AI智慧前台 report](https://js.cnr.cn/rdzt/qnjs/qnjsgdxw/20260203/t20260203_527514589.shtml)
- [苏州新闻网 report](https://news.2500sz.com/doc/2026/02/04/1194375.shtml)
- [Baidu Baike candidate entity](https://baike.baidu.com/item/%E8%8B%8F%E5%B7%9E%E6%9C%AA%E6%9D%A5%E5%89%8D%E5%8F%B0%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/54031291)

Some public sources disagree on legal representative or qualification details. Therefore:

- no legal-entity claim is treated as confirmed;
- no product model, price, certification, customer count or service SLA is generated from search snippets;
- customer verification is mandatory before publishing factual articles.

## 100-question allocation

| Category | Count | Purpose |
|---|---:|---|
| Brand | 20 | Entity confirmation, reputation and sales questions |
| Category | 25 | Hotel self-service machine selection and procurement |
| Scene | 25 | Small hotels, homestays, PMS integration, unattended operation |
| Compare | 15 | Alternatives, traditional front desk and competing approaches |
| Risk | 15 | Failures, privacy, after-sales, complaints and negative category questions |

Export the complete list:

```bash
node apps/geo-evidence-studio/cli.mjs export-queries
```

Output: `outputs/geo-evidence-studio/future-frontdesk-queries.csv`.

## Client inputs still required

- business-license legal entity and approved short name;
- official owned domains;
- product names, models, parameters and supported/unsupported scenarios;
- competitor list;
- target platforms and priority regions;
- approved content templates and forbidden claims;
- publishing accounts and human approvers.
