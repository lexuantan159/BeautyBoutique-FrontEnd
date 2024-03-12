import React, { useEffect, useState } from 'react'
import * as productApi from '../../services/product'
const Product = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        try {
            const fetchData = async() =>{
                const getProduct = await productApi.getProduct()
                setProducts(getProduct.data)
            }
            fetchData()
            console.log(products);
        } catch (error) {
            console.log(error);
        }
    }, []);
    
  return (
    <div className='w-full flex items-center justify-center mt-32'>
        <div className='w-4/5 flex h-10 bg-black'  >

        </div>

      
    </div>
  )
}

export default Product
