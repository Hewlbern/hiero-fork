curl --tlsv1.2 -X POST \
  http://localhost:3000/api/tokens/deduct \
  -H "Content-Type: application/json" \
  -H "X-Developer-API-Key: ba2a8aa0-0866-4d3f-a84a-048b96cd63cc" \
  -H "X-User-API-Key: 1443f051-c89f-4863-a8a4-ba32d13d567c" \
  -d '{
    "amount": 800,
    "model": "gpt-4o",
    "label": "testing",
    "multiplier": 1.5
  }'