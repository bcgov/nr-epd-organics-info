[![MIT License](https://img.shields.io/github/license/bcgov/quickstart-openshift.svg)](/LICENSE.md)
[![Lifecycle](https://img.shields.io/badge/Lifecycle-Experimental-339999)](https://github.com/bcgov/repomountie/blob/master/doc/lifecycle-badges.md)

# Organics Info (ORI) - OMRR Transparency Initiative

Organics Info (ORI) shares information on authorized biosolids land application and compost facilities regulated under the Organic Matter Recycling Regulation (OMRR) in BC.

This project is part of the OMRR Transparency Enhancement Initiative led by the Environmental Policy and Initiatives Branch (EPIB) in the Ministry of Environment and Climate Change Strategy.

# Technologies used

We have [architecture diagrams](.diagrams/architecture) the document the technologies used:

- Typescript (https://www.typescriptlang.org/)
- React (https://react.dev/)
- Mui (https://mui.com/)
- Leaflet (https://leafletjs.com/)
- Node (https://nodejs.org/en/)
- OpenShift container platform cluster

# Getting Started

Here is high-level documentation on the development of applications, use of GitHub, and Openshift in the Government of BC:

- ["Working in github.com/bcgov" Cheatsheet](https://github.com/bcgov/BC-Policy-Framework-For-GitHub/blob/master/BC-Gov-Org-HowTo/Cheatsheet.md)
- [DevHub DC Developer guide](https://developer.gov.bc.ca/docs/default/component/bc-developer-guide/)
- [DevHub Openshift documentation](https://developer.gov.bc.ca/docs/default/component/platform-developer-docs)

## Running the application in local development environment

Pre-requisites:

- Node.js installed on the machine
- Access to OpenShift namespace for Organics Info (ORI) project
- OC CLI installed.(https://console.apps.silver.devops.gov.bc.ca/command-line-tools) and is on path.
- Copy the .env.sample in frontend and paste it as .env and update the value of `VITE_API_URL=http://localhost:3000`
- Run the [env generator for windows](./utils/env-gen.ps1) or [env generator for linux](./utils/env-gen.sh), it will generate the backend/.env file

Steps:

1. Open a terminal, run the following command
   - `oc login --server=https://api.silver.devops.gov.bc.ca:6443 --web`
   - switch to namespace `oc project d37bb7-dev`
2. Run the following command in terminal `oc port-forward service/nr-oracle-service 9080:80`, this enables access to nr
   oracle service on port 9080 of local machine.
3. Run the following command in terminal `cd backend && npm install && npm run start:debug`, this will start the backend
   application on port 3000.
4. Run the following command in terminal `cd frontend && npm install && npm run dev`, this will start the frontend
   application on port 3001.

# Contribution Guidelines

Follow the steps outlined in this repository to contribute: [CONTRIBUTING.md](./CONTRIBUTING.md).

# License

Copyright 2024 Province of British Columbia. Code is released under the [Apache License, Version 2.0](./LICENSE).
