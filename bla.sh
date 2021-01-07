set -x
dataJS='{
    Status: 1,
    Title: "Test tester-hub evidence",
    Etime: "00:01:00.000",
    EvidencePath: "http://evidence.vtex.com/api/evidence?application=vtex.tester-hub&hash=72ddbc3474335e2d3b616e1408d8df8a",
    Module: "VTEX IO - Tester Hub",
}'
dataJSON=$(node -e "console.log(JSON.stringify($dataJS))")
curl --verbose --header "Content-Type: application/json" \
  --request POST \
  --data "$dataJSON" \
  https://monitoring.vtex.com/api/healthcheck/results?repository=beta