#!/usr/bin/env bash
set -euo pipefail

# The hosted Ubuntu image already has Chromium's OS dependencies. Only install
# missing packages if the exact locked headless shell fails its launch probe.
playwright=node_modules/.bin/playwright
"$playwright" install --only-shell chromium
probe='import { chromium } from "@playwright/test"; const browser = await chromium.launch(); await browser.close();'
if ! node --input-type=module -e "$probe"; then
  "$playwright" install-deps chromium
  node --input-type=module -e "$probe"
fi
