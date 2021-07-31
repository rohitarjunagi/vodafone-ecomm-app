import React, { useState, useEffect, useContext } from 'react';
import listContext from '../list_context';

function List() {

  const [list, setList] = useState([]);

  /* we imagine we load the products from a rest api
  so we use the useEffect() hook to setList as soon as
  the component is loaded */

  useEffect(() => {
    // we assume this array was loaded from a rest api:
    const productList = [
      {
        "name": "book",
        "id": "1",
        "price": 3
      },
      {
        "name": "laptop",
        "id": "2",
        "price": 5
      },
      {
        "name": "game console",
        "id": "3",
        "price": 7
      },
      {
        "name": "radio",
        "id": "4",
        "price": 9
      },
      {
        "name": "notenook",
        "id": "5",
        "price": 11
      }
    ];

    setList(productList);

  }, [])

  const pdlist = list.map((i, index) => {
    return <li key={index}>product name: <strong>{i.name}</strong> | price: <strong>{`$${i.price}`}</strong>  <Addbutton pd={i} /></li>
  })

  return (
    <ul>
      {pdlist}
    </ul>
  );

}

//// a button to add new product to cart

function Addbutton(props) {

  const stt = useContext(listContext);

  return (
    <button onClick={() => stt.addProduct(props.pd)}>
      add to cart
    </button>
  )
}

export default List;

