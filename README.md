<!-- omit in toc -->
# Cypress Example
A reference app showcasing how to declare Cypress end-to-end tests and run them on IO's Test Architecture.

- [Getting started](#getting-started)
- [Configuration](#configuration)
  - [Basic](#basic)
  - [Advanced](#advanced)
- [Authenticating to *.myvtex.com](#authenticating-to-myvtexcom)
- [Notes on using TypeScript](#notes-on-using-typescript)
- [Test callbacks](#test-callbacks)
- [Running Cypress locally](#running-cypress-locally)

## Getting started
First of all, you should have a working Cypress test suite. If you do, skip to [Basic Configuration](#basic).

Otherwise, to get the basic Cypress structure:

- Make sure you have `cypress` (and, optionally, `typescript`) as a dev dependency:
  - `$ yarn add cypress@4.5.0 typescript -D`
  - **Note**: `4.5.0` is the Cypress version IO runs your tests on, so we recommend you write and debug your tests using this version.
- Fire up Cypress once and it will scaffold some directories and sample integration tests for you:
  - `$ npx cypress open`

## Configuration
### Basic
Declare that your app wants to use the `cypress@0.x` builder in its [manifest.json](manifest.json) file and add `vtex.tester-hub@0.x` as one of its dependencies:
```console
$ vtex add vtex.tester-hub@0.x
```
Then *link* or *install* your app. From now on you can use the `test e2e` command to run your tests:
```console
$ vtex test e2e
```

### Advanced
To make your test suite reusable across *accounts* and *workspaces*, you can take advantage of the `<account>` and `<workspace>` placeholders in your [cypress.json "baseUrl"](cypress.json):
```jsonc
// cypress.json
{
  "baseUrl": "https://<workspace>--<account>.myvtex.com",
  ...
}
```
Then make sure to use relative paths in your `cy.visit()` calls.

Note, however, that this isn't a valid *URL* and your tests won't work when you use `cypress open` or `cypress run`. Refer to the [Running Cypress locally](#running-cypress-locally) section for a work around.

## Authenticating to *.myvtex.com
Since `myvtex.com` is an authenticated domain, tests against it need to set the `VtexIdclientAutCookie` cookie, otherwise they will land on the login page. 

The test framework will make a *token* available - should one be provided - through the `authToken` environment variable. Test code can then access this *token* using `Cypress.env('authToken')`.

To provide your local user *token*, pass the `--token` command line argument to the *test* command:
```console
$ vtex test e2e --token
```

When running Cypress locally, you must provide the *token* yourself through the `CYPRESS_authToken` environment variable. Refer to the [Running Cypress locally](#running-cypress-locally) section for more information.

We provide a sample custom Cypress command to set the required cookie in this [file](cypress/support/vtex.ts). Tests must then call this command before attempting to visit a `*.myvtex.com` page.

## Notes on using TypeScript
If you wish to write your integration tests in TypeScript, you will need a `tsconfig.json` file. This file **must** be inside the `cypress` folder. We provide a sample TypeScript configuration [here](cypress/tsconfig.json).

Note that a `.ts` `pluginsFile` is **not currently supported** and, if you need a `pluginsFile`, you should use JavaScript. Additionally, don't forget to update your `supportFile` path in your [cypress.json](cypress.json) file if you choose to write it in TypeScript, e.g.:
```jsonc
// cypress.json
{
  ...
  "supportFile": "cypress/support/index.ts",
  ...
}
```

## Test callbacks
Your app may choose to be notified whenever its tests are run. You can choose *spec completion callbacks* and/or *test completion callbacks* through the following properties in your [cypress.json](cypress.json) file:
```jsonc
// cypress.json
{
  ...
  "specCallback": true,
  "completeCallback": true,
  ...
}
```
`tester-hub` will then `POST` the *JSON* report payload on the following routes:
- `/_v/e2e_spec_callback/*spec`
  - where `*spec` is the full path to the spec, i.e. `cypress/integration/basic.spec.ts`
- `/_v/e2e_complete_callback/:testId`
  - where `:testId` is the *test request id* assigned by `tester-hub`

For more information on the payload format, refer to these files: [node/middlewares/e2e.ts](node/middlewares/e2e.ts) and [node/typings/e2e.d.ts](node/typings/e2e.d.ts).

Additionally, you will need to declare that your app now uses the `node@6.x` builder in your [manifest.json](manifest.json) file and configure a service, allowing `tester-hub` to call your app. Refer to these files: [node/service.json](node/service.json) and [node/index.ts](node/index.ts).

## Running Cypress locally
*\~\~ Linux/MacOs only \~\~*

To make using *dynamic* `baseUrl` and `*.myvtex.com` authentication painless when running Cypress locally, we provide the [cypress-local.sh](cypress-local.sh) script.

This script will resolve the `baseUrl` configured in your [cypress.json](cypress.json) file using the currently logged-in *account* and *workspace*, and also expose the user's local token through the `CYPRESS_authToken` environment variable.

- Download the file and make sure it's executable:
  ```console
  $ sudo chmod +x cypress-local.sh
  ```
- Use it as a drop-in replacement for `cypress`:
  - `./cypress-local.sh open`
  - `./cypress-local.sh run --headless --config pageLoadTimeout=100000,watchForFileChanges=false`
- *(Optional)* set up [package.json](package.json) scripts:
  ```jsonc
  // package.json
  {
    ...
    "scripts": {
      "cypress:open": "./cypress-local.sh open",
      "cypress:run": "./cypress-local.sh run"
    },
    ...
  }
  ```




