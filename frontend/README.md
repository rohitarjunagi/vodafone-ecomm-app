# Vodafone Ecomm App Backend Api
This project is cloned and extended from https://github.com/hoseinhamzei/Shopping-Cart-with-react-context-api

## Getting Started

#### Install dependencies:

```bash
yarn install
```

#### Set environment variables:

Create an env file in the front end folder and add the port number as below:

PORT=5000

## Running Locally

Before running locally, Please make sure to read the Readme file of the backend and start the backend server before running this front end React app.

```bash
yarn start
```

## Using the App

Click on the prodcuts button on the top left to add products to the cart.

Then click on the Cart to review the cart.

Click on submit to submit the cart to the backend api.

After successful submission, the submitted items are displayed below the submit button.

After submitting, the submit button is disabled. Only one submit request per session.