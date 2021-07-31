import React, { useState } from 'react';
import listContext from './list_context';
import { v4 } from 'uuid';


function Store({children}){

    // the app's initial state

    const initialState = { 

      
      customerId: v4(),
      
      
      basket: {
        basketId: v4(),
        products:[],

      },

      cartCount:0,
  
      addProduct: addProduct,
      
      }

      //initiate app state with initialstates

      const [ appstate, setState ] = useState(initialState);
      
      // pass the state as context's value
      
    return(
      <listContext.Provider value={appstate}>
        {children}
      </listContext.Provider>
    )

    ////// add new product to products and update products count

    function addProduct(pd){
        let newList = appstate.basket.products;
    
        const newItem = {
          count:1,
          id:pd.id,
          name:pd.name,
          price: pd.price
        }
    
        // const filtered = newList.filter(i =>{
        //   return i.id === pd.id;
        // });
    
        // if(filtered.length > 0){
        //   const pos = newList.map(i => { return i.id; }).indexOf(pd.id);
        //   newList[pos].count += 1;
        //   newList[pos].price += newList[pos].price * newList[pos].count;
        // }else{
          newList.push(newItem);
        // }
        
        setState({...appstate, products:newList, cartCount:getCartCount()});


      }
    

      function getCartCount(){

        let cnt = 0;
    
        if(appstate.basket.products.length > 0){
    
          appstate.basket.products.forEach(item => {
          cnt += item.count;
          });
          
        }

        return cnt;

      }
    
}

export default Store;
