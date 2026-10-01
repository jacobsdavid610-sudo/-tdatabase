#!/bin/sh
set -e

# The DbContext reads appsettings.json directly off disk, so env vars alone
# aren't enough. Secrets are mounted at /secrets (Docker -v locally, Secret
# Manager volume on Cloud Run) and linked into the app folder.
if [ -f /secrets/appsettings.json ]; then
  ln -sf /secrets/appsettings.json /app/appsettings.json
fi

exec dotnet TRAINERS.WEB.dll
