curl -X GET "https://api.bigcommerce.com/stores/day26hsh2m/v3/hooks" \
  -H "X-Auth-Token: 3tforhhkp86u8bwc9zbt6s5ms89j3ob" \
  -H "Accept: application/json" | jq '.data[] | {id, scope, destination}'