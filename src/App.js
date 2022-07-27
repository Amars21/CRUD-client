import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import {Stack} from  '@chakra-ui/react';
import { Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import Axios from 'axios';

function App() {

  const [productName, setProductName] = useState("");
  const [productReview, setProductReview] = useState("");
  const [productList, setProductList]= useState([]);
  const [update, setUpdate]= useState("");

  function ProductNameHandler(event){
    setProductName(event.target.value)
  }

  function ProductReviewHandler(event){
    setProductReview(event.target.value);
  }

  function UpdateState(event){
    setUpdate(event.target.value);
  }

  useEffect(()=>{
    Axios.get("http://localhost:3002/api/get").then((response)=>{
      setProductList(response.data);
    })
  })

  function SubmitHandler(e){
    e.preventDefault();
    Axios.post("http://localhost:3002/api/insert", {
      productName: productName,
      productReview: productReview
    }).then(()=>{
      setProductList(...productList, {productName: productName, productReview:productReview})
    })
    setProductName("");
    setProductReview("");
  };

  function DeleteHandler(id){
    if(window.confirm("Are you sure you want to delete this product?"))
    Axios.delete(`http://localhost:3002/api/delete/${id}`);
  }

  function UpdateHandler(name){
    Axios.put("http://localhost:3002/api/update",{
      productReview: update,
      productName: name
    })
    
    setUpdate("");
  }


  return (
    <ChakraProvider>
       <h1>Product Review</h1>

      <div className='container'>

           <div className='form'>
      <Stack spacing={3}>

        <Input variant='outline' placeholder='Product Name' size='md' width='700px' value={productName} onChange={ProductNameHandler} />
        <Input variant='outline' placeholder='Product Review' size='md' width='700px' value={productReview} onChange={ProductReviewHandler} />

        <Button size='md' colorScheme='blue' onClick={SubmitHandler}>Submit</Button>

        {productList.map((product)=>{
          return <div className='card'>
            <button onClick={()=> {DeleteHandler(product.id)}} id='delete'>Delete</button>
            <ul>
            <h2>{product.name}</h2>
            <p>{product.review}</p>
            </ul>
            <input onChange={UpdateState} placeholder='Edit review'></input>
            <button onClick={()=> {UpdateHandler(product.name)}} id='edit'>Edit</button>
            
            </div>
        })}
      
      </Stack>
      </div>
      </div>
    </ChakraProvider>
    
  );
}

export default App;
