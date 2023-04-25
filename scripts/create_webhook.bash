curl -X POST "https://api.bigcommerce.com/stores/day26hsh2m/v3/hooks" \
-H "X-Auth-Token: 3tforhhkp86u8bwc9zbt6s5ms89j3ob" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d '{ 
 "scope": "store/cart/*", 
 "destination": "https://ea6a-47-156-232-192.ngrok-free.app/api/webhooks/bigcommerce", 
 "is_active": true 
}' 