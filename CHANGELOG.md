# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Fixed
- `cypress-local.sh`

### Added
- Cypress with Typescript configuration.
- `cypress/support/vtex.ts` file with helper `setVtexIdCookie` command.
- Sample integration test.
- `cypress-local.sh` helper script that:
  - resolves `cypress.json` `baseUrl`'s placeholders `<account>` and `<workspace>` to currently logged in account and workspace.
  - exposes user's local vtex token to Cypress' tests via `CYPRESS_authToken` environment variable.
