function Product({product}) {
    console.log(`THIS ARE THE PRODUCTS RETRIEVED FROM THE END POINT ${product.title}`)

  return (
    <div>Product Title : {product?.title}
    <br/>
    Product Price: {product?.price}
    </div>
  )
}

export default Product


export const getSeverSideProps = async () => {
    const graphqlQuery = {
      query: `
      {
        product(id: 1) {
          title
          price
        }
      }         
      `,
      variables: {
        page: 1
      }
    };
   const result = await fetch(process.env.GRAPHQL_LOCAL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(graphqlQuery)
    })
      .then(res => {  
        return res.json();
      })
     
      const data = await result
    return {
      props: {
        product: data.data.product
      }
    }
  }