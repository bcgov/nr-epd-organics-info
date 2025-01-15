<#
.SYNOPSIS
This script is an environment generator for backend.

.DESCRIPTION
This script sets up the necessary environment variables and configurations required for the backend system to function properly.
.EXAMPLE
# To run this script, use the following command:
# .\env-gen.ps1 "



#>
$file_path = "$PSScriptRoot/../backend/.env"

# Log in to OpenShift
Start-Process "oc" -Wait -ArgumentList "login --server=https://api.silver.devops.gov.bc.ca:6443 --web"


#switch to dev, 
oc project d37bb7-dev

# Get the secret data
$secretData = oc get secret nr-oracle-service -n d37bb7-dev -o json | ConvertFrom-Json

# Decode the secret data and create the .env file
$envContent = ""
foreach ($key in $secretData.data.PSObject.Properties.Name) {
    if ($key -eq "apiKey") {
        $decodedValue = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($secretData.data.$key))
        $envContent += "NR_ORACLE_SERVICE_KEY=$decodedValue`n"
    }
}
$envContent += "NR_ORACLE_SERVICE_URL=http://localhost:9080`n"
$envContent += "OMRR_AUTHZ_DOCS_FLAG=true`n"
$envContent += "OMRR_APP_STATUS_FLAG=flase"
# Write the content to the output file
$envContent | Out-File -FilePath "$file_path" -Encoding utf8


Write-Host "Environment file created at $file_path"