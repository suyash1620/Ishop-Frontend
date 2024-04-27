import axios from 'axios'
import React,{useState,useEffect} from 'react'
import ProductCard from './Productcard'
import { Col, Row } from 'react-bootstrap'
import '../App.css'

const Products = () => {
  const [products,setProducts] = useState([])
  const [path,setPath] = useState('')
  useEffect(()=>{
    axios.get('http://localhost:7001/get-products')
    .then((res)=>{
      setProducts(res.data.data)
      console.log(res.data);
      setPath(res.data.filepath)
    })
  },[])
  return (
    <div className="productmedia"> 
      <h1>Products</h1>

      <Row>
        {
          products.length > 0?
          products &&
          products.map((product,ind)=>{
            return(
              <Col md={4} key={ind} className="mb-3">
                <ProductCard product={product} path={path}/>
              </Col>
            )
          })
          :<h1>Loading...</h1>
          
        }
        
      </Row>
    </div>
  )
}

export default Products