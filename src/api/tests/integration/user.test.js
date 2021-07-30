/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */
const request = require('supertest');
const httpStatus = require('http-status');
const { expect } = require('chai');
const app = require('../../../index');
const uuid = require('uuid');


const customerId = uuid.v4();

const basketId = uuid.v4();
const userProduct1 = {

  customerId,
  basket: {
    basketId,
    products: [
      {
        id: 'productId1',
        name: 'Soap',
        price: 3,
      },
    ],
  },
};

describe('Users Products API', async () => {
  describe('POST /v1/userProducts/', () => {
    it('should create a new user product when request is ok', () => {

      return request(app)
        .post('/v1/userProducts/')
        .send(userProduct1)
        .expect(httpStatus.CREATED)
        .then((res) => {
          delete res.body.createdAt;
          expect(res.body).to.eql(userProduct1);
        });
    });

    it('should get user products for a given customer id', () => {
      const expectedResponse = [{
        customerId,
        basket:
        {
          basketId,
          products: [{ id: 'productId1', name: 'Soap', price: 3 }]
        },
      }];
      return request(app)
        .get(`/v1/userProducts/?customerId=${customerId}`)
        .expect(200)
        .then((res) => {
          let result = res.body;
          result = result.map(res => delete res.createdAt);
          expect(res.body).to.eql(expectedResponse);
        });
    });

    it('should throw validation errors when the basketId is not provided', () => {
      const invalidRequestBody = {
        customerId: '234234234234234',
        basket: {
        },
      };

      const invalidRequestBodyResult = {
        code: 400,
        message: 'Validation Error',
        errors:
          [{
            field: 'basket.basketId',
            location: 'body',
            messages: ['"basketId" is required'],
            types: ['any.required'],
          }],
      };

      return request(app)
        .post('/v1/userProducts/')
        .send(invalidRequestBody)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body).to.eql(invalidRequestBodyResult);
        });
    });

    it('should throw validation errors when a duplicate customer id is provided', () => {

      return request(app)
        .post('/v1/userProducts/')
        .send(userProduct1)
        .expect(httpStatus.INTERNAL_SERVER_ERROR)
        .then((res) => {
          expect(res.body.message).to.equal(`E11000 duplicate key error collection: express-rest-es2017-boilerplate.userproducts index: basket.basketId_1 dup key: { basket.basketId: \"${basketId}\" }`);
        });
    });

    it('should throw validation errors when the customer id is a number', () => {
      const invalidRequestBody = {
        customerId: 234234234234234,
        basket: {
          basketId: '56777',
        },
      };

      const invalidRequestBodyResult = {
        code: 400,
        message: 'Validation Error',
        errors: [
          {
            field: 'customerId',
            location: 'body',
            messages: [
              '"customerId" must be a string',
            ],
            types: [
              'string.base',
            ],
          },
        ],
      };

      return request(app)
        .post('/v1/userProducts/')
        .send(invalidRequestBody)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body).to.eql(invalidRequestBodyResult);
        });
    });

    it('should throw an error when customer id is not provided in the query param', () => {
      const invalidRequestBodyResult = {
        code: 400,
        message: 'Validation Error',
        errors: [
          {
            field: 'customerId',
            location: 'query',
            messages: [
              '"customerId" is required',
            ],
            types: [
              'any.required',
            ],
          },
        ],
      };
      return request(app)
        .get('/v1/userProducts/?product=soap')
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body).to.eql(invalidRequestBodyResult);
        });
    });
  });
});
