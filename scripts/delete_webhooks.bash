#!/bin/bash

webhook_ids=(
  26130637
  26173397
  26186769
  26187037
)

for webhook_id in "${webhook_ids[@]}"; do
  curl -X DELETE "https://api.bigcommerce.com/stores/day26hsh2m/v3/hooks/$webhook_id" \
  -H "X-Auth-Token: 3tforhhkp86u8bwc9zbt6s5ms89j3ob" \
  -H "Accept: application/json"
  echo "Webhook ID $webhook_id deleted."
done