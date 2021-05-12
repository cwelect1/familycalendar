# Family Calendar

This is my final project for CSCI-E90b 

I used the this [project](https://github.com/aws-samples/ask-around-me/) as a template. 

## Prerequisites

* AWS SAM CLI installed
* NodeJS 12.x installed
* [Vue.js and Vue CLI installed](https://vuejs.org/v2/guide/installation.html)
* Sign up for an [Auth0 account](https://auth0.com/)

## Auth0 configuration
These instruction are based on running the app locally.</br>
If you host on any other server (e.g. Production), you need to add that URL to the fields noted in step 5.

1. Sign up for an Auth0 account at https://auth0.com. 
2. Select Applications from the left hand nav, then click the **+Create Application** button.
3. Enter the name of your app e.g. *Family Calendar* and select *Single Page Web Applications* for application type. Choose **Create**.
4. Select the *Settings* tab, and note the `Domain` and `ClientID` for installation of the application backend and frontend.
5. Under *Allowed Callback URLs*, *Allowed Logout URLs* and *Allowed Web Origins* and *Allowed Origins (CORS)*, enter **http://localhost:8080**. Choose **Save Changes**.
6. Select APIS from the menu, then choose **Create API**.
7. Enter the name *Ask Around Me*, and set the *Identifier* to **https://auth0-jwt-authorizer**. Choose **Create**.

Auth0 is now configured for you to use. The backend uses the `domain` value to validate the JWT token. The frontend uses the identifier (also known as the audience), together with the *Client ID* to validate authentication for this single application. For more information, see the [Auth0 documentation](https://auth0.com/docs/api/authentication).

## Installation Instructions

1. Clone the repo onto your local development machine using `git clone`.

### Installing the backend application

cd to the 'backend' folder and run:
```
sam build
sam deploy --guided
```

When prompted for parameters, enter:
- Stack Name: familyCalendar-backend
- AWS Region: your preferred AWS Region (e.g. us-east-1)
- Parameter EventsTableName: leave as default
- Parameter Auth0issuer: Enter the URL for your Auth0 account (the format is https://dev-abc12345.auth0.com/).
- Accept all other defaults.

This takes a minute or 2 to deploy. At the end of the deployment, note the `APIendpoint` value, as you need this in the frontend installation.

### Installing the frontend application

The frontend code is saved in the `frontend` subdirectory. 

1. Before running, you need to set environment variables in the `src\main.js` file:

- APIurl: this is the `APIendpoint` value from the last section.
- Region: your preferred AWS Region (e.g. us-east-1).

2. Open the `frontend\auth_config.json` and enter the values from your Auth0 account:
- domain: this is your account identifier, in the format `dev-12345678.auth0.com`.
- clientId: a unique string identifying the client application.
- audience: set to https://auth0-jwt-authorizer.

3. Change directory into the frontend code, and run the NPM installation:

```
cd ../frontend
npm install
```
4. After installation is complete, you can run the application locally:

```
// Build the production distro
npm run build
// Run server locally
npm run serve
```
