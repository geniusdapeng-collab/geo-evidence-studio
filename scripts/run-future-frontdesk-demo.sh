#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DB="${GEO_DEMO_DB:-$ROOT/var/future-frontdesk-demo.sqlite}"
CLI="$ROOT/apps/geo-evidence-studio/cli.mjs"

node "$CLI" init --db "$DB"
node "$CLI" run --provider fixture --limit 100 --concurrency 4 --db "$DB"
node "$CLI" articles --db "$DB"
article_id="$(node --input-type=module -e "
import { GeoStore } from '$ROOT/apps/geo-evidence-studio/lib/store.mjs';
const store = new GeoStore('$DB');
console.log(store.listArticles(1)[0].id);
store.close();
")"
node "$CLI" publish --article-id "$article_id" --channel local --approved-by "demo-operator" --db "$DB"
node "$CLI" export-queries --db "$DB"
node "$CLI" report --db "$DB" --out "$ROOT/outputs/geo-evidence-studio/fixture-report"
node "$CLI" serve --db "$DB"
