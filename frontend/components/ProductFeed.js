import Products from './Products'
import { useEffect, useState } from 'react'
const ProductFeed = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const graphqlQuery = {
      query: `
      {
        products(page: 1) {
          products{
            title
            price
            imageUrl
            description
          }
        }
      }
      `,
      variables: {
        page: 1
      }
    };
   fetch('https://aerosmart-mysql-db.onrender.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(graphqlQuery)
    })
      .then(res => {  
        return res.json();
      })
      .then(productData => {
        setProducts(productData.data?.products?.products)
      })
  }, [products])

  
  return (
    <div
    className='grid grid-cols-2 grid-flow-row-dense md:grid-cols-3 lg:grid-cols-3
  xl:grid-cols-4 mx-auto m-2 gap-2 px-2 md:px-4'
  >
    {products.map(({ id, title, price, description, category, imageUrl }) => (
      <Products
        key={id}
        id={id}
        title={title}
        price={price}
        description={description}
        category={category}
        image={imageUrl}
      />
    ))}
  </div>
  )
}

export default ProductFeed
