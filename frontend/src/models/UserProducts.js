import axios from "axios";

const config = require('../config/dev.json');


export const getUserProducts = async (customerId) => {
  const resp = await axios.get(`${config.baseURL}/userProducts?customerId=${customerId}`);
  return resp.data;
};

export const submitUserProducts = async (userProducts)=> {
    console.log('base url???????   ', config.baseURL)
    console.log('userProducts url???????   ', userProducts)
  await axios.post("http://localhost:3000/v1/userProducts", userProducts);
};
