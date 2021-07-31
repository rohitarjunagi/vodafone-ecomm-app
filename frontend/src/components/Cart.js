import React, { useContext, useState, useEffect } from 'react';
import styled from "styled-components";
import listContext from '../list_context';

import { submitUserProducts, getUserProducts } from '../models/UserProducts';

const SubmitButton = styled.input`
  background-color: #090;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
`;

function Cart() {

  // get shopping products array from listcontext

  const { customerId, basket } = useContext(listContext);
  const [submitting, setSubmitting] = useState(false);
  const [submittedUserProducts, setSubmittedUserProducts] = useState([]);

  console.log('basket??????????   ', basket);

  const cartlist = basket.products.map((i, index) => {
    // console.log('products???????????   ', products);
    return (
      <tr key={index}>
        <td>{i.id}</td>
        <td>{i.name}</td>
        <td>{'x' + i.count}</td>
        <td>{'$' + i.price}</td>
      </tr>
    )
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    console.log('coming in handle submit????');
    const userProducts = {
      customerId,
      basket
    };
    try {
      await submitUserProducts(userProducts);
    } catch (e) {
      console.log(e);
    }
    // setSubmitting(false);
    await loadSubmittedUserProducts(customerId);
  };

  const loadSubmittedUserProducts = async (customerId) => {
    try {
      const items = await getUserProducts(customerId);
      setSubmittedUserProducts(items);
    } catch (e) {
      console.log(e);
    }
  };


  useEffect(() => {
    loadSubmittedUserProducts(customerId);
  }, []);

  if (basket.products.length > 0) {

    return (

      <div>

        <div style={
          { padding: '15px' }
        }>


          <table className='c'>

            <tr className='thead'>
              <th>ID</th>
              <th>NAME</th>
              <th>QUANTITY</th>
              <th>Price</th>
            </tr>
            {cartlist}
          </table>



          <SubmitButton type="submit" value="Submit" disabled={submitting} onClick={handleSubmit} />


        </div>

        <div>

          {
            (submittedUserProducts.length > 0 && submittedUserProducts[0].basket.products.length > 0)
              ? <div style={
                { padding: '15px' }
              }>
                <h1>Submitted Products</h1>
                <ul>
                  {submittedUserProducts[0].basket.products.map((i) => (

                    <li key={i.id}>
                      <strong>Name:</strong> {i.name} || <strong>Price:</strong> ${i.price}
                    </li>
                  ))}
                </ul>
              </div>
              : <div> Click Submit to submit items </div>
          }
        </div>
      </div>
    )

  } else {
    return <p className='c'>cart is empty</p>
  }

}


export default Cart;