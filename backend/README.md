# Vodafone Ecomm App Front end React App
This project is cloned and extended from https://github.com/danielfsousa/express-rest-boilerplate

## Getting Started

#### Install dependencies:

```bash
yarn
```

#### Set environment variables:

```bash
cp .env.example .env
```

## Running Locally

```bash
yarn docker:dev
```

Once the docker is running, the app is avaliable on port 3000. You can make get a post requests to 
http://localhost:3000/v1/userProducts

## Sample Post request:

Post: http://localhost:3000/v1/userProducts/

Body: 

```json
{
	"customerId": "RohitArj",
	"basket": {
		"basketId": "1567",
		"products": [{
			"id": "productId",
			"name": "Soap",
			"price": 3
			}]
		}
}
```

Expected Response:

```json
{
    "customerId": "RohitArj",
    "basket": {
        "basketId": "1567",
        "products": [
            {
                "id": "productId",
                "name": "Soap",
                "price": 3
            }
        ]
    },
    "createdAt": "2021-07-29T22:26:03.757Z"
}

```

## Sample Get request:

Get: http://localhost:3000/v1/userProducts/?customerId=RohitArj

Expected Response: 

```json
[
    {
        "customerId": "RohitArj",
        "basket": {
            "basketId": "1567",
            "products": [
                {
                    "id": "productId",
                    "name": "Soap",
                    "price": 3
                }
            ]
        },
        "createdAt": "2021-07-29T22:26:03.757Z"
    }
]
```

## Run Integration Tests

```bash
# run tests
yarn docker:test
```
