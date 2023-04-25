#!/bin/bash

destination="$1"

if [ -z "$destination" ]; then
  echo "Error: A destination URL is required."
  echo "Usage: $0 <destination_url>"
  echo "Example: $0 https://example.com/api/webhooks/bigcommerce"
  exit 1
fi

curl -X POST "https://api.bigcommerce.com/stores/day26hsh2m/v3/hooks" \
-H "X-Auth-Token: 3tforhhkp86u8bwc9zbt6s5ms89j3ob" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{
  "scope": "store/cart/*",
  "destination": "'"$destination"'",
  "is_active": true
}'
