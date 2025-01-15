#!/bin/bash
# Set file path relative to script location
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FILE_PATH="${SCRIPT_DIR}/../backend/.env"
echo "Creating environment file at $FILE_PATH"
# Log in to OpenShift
oc login --server=https://api.silver.devops.gov.bc.ca:6443 --web

# Switch to dev project
oc project d37bb7-dev

# Get the secret data and process with jq
SECRET_DATA=$(oc get secret nr-oracle-service -n d37bb7-dev -o json)

# Initialize env content
ENV_CONTENT=""

# Extract and decode apiKey
API_KEY=$(echo "$SECRET_DATA" | jq -r '.data.apiKey' | base64 -d)
ENV_CONTENT="NR_ORACLE_SERVICE_KEY=$API_KEY
NR_ORACLE_SERVICE_URL=http://localhost:9080
OMRR_AUTHZ_DOCS_FLAG=true
OMRR_APP_STATUS_FLAG=flase"

# Write content to .env file
echo "$ENV_CONTENT" > "$FILE_PATH"

echo "Environment file created at $FILE_PATH"