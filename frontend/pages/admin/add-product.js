import Head from "next/head"
import { useState } from "react"

const AddProduct = () => {
  const [productData, setProductData] = useState({
    title: '',
    price: '',
    quantity: '',
    imageUrl: '',
    description: ''
  })
  const [success, setSuccess] = useState(false)
  const addProductHandler = (e) => {
    e.preventDefault()

  let graphqlQuery = {
    query: `
    mutation CreateProduct($title: String!, $price: Int!, $imageUrl: String!, $description: String!) {
      createProduct(productInput: {title: $title, price: $price, imageUrl: $imageUrl, description: $description}) {
        title
        price
        imageUrl
        description
      }
    }
  `,
    variables: {
      title: productData.title,
      price:Number(productData.price),
      imageUrl: productData.imageUrl,
      description: productData.description,
    }
  };

 fetch('http://localhost:8000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(graphqlQuery)
  })
    .then(res => {  
      return res.json();
    })
    .then(result => {
      setProductData({
        title: "",
        price: "",
        quantity: "",
        imageUrl: "",
        description: ""
      })

      setTimeout(() => {
        setSuccess(true)
      }, 1000);
      setTimeout(() => {
        setSuccess(false)
      }, 8000);
    })

    // .then(resData => {
    //   console.log(resData)
    //   const products = {
    //     title: resData.data.createProduct.title,
    //     price: resData.data.createProduct.price,
    //     imageUrl: resData.data.createProduct.imageUrl,
    //     description: resData.data.createProduct.description,
    //   };
    //   return {
    //     products: products,
    //   }
    // })
    .catch(err => console.log(err))
}

  

    const isUpdate = false
    const productInputHandler = (inputIdentifier, e) => {
      setProductData((currentInputs) => {
        return {
          ...currentInputs,
          [inputIdentifier]: e.target.value,
        };
      });
    };

    // console.log(productData)

  return (
    <div classname="mt-20">
          <Head>
           {/* fonts import */}
           <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
          <link href='https://fonts.googleapis.com/css2?family=Calligraffitti&family=Changa:wght@200;300;400;500;600;700;800&family=Edu+VIC+WA+NT+Beginner:wght@400;500;600;700&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Cairo:wght@200;300;400;500;600;700;800;900;1000&family=Exo+2:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,600;1,700;1,800&family=Lobster+Two:ital,wght@0,400;0,700;1,400;1,700&family=Play:wght@400;700&family=Rajdhani:wght@300;400;500;600;700&family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;1,200;1,300;1,400;1,600;1,700&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Metal+Mania&family=Montez&family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Play:wght@400;700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,400;1,500;1,700;1,900&family=Sedgwick+Ave+Display&display=swap&family=PT+Serif:ital@0;1&display=swap'
            rel='stylesheet'
          />

      </Head>


    <form  >
      <h2 className="text-center text-xl uppercase text-gray-500  my-5 [word-spacing: 10px] ">
        {isUpdate ? 'add product' : 'update product'}
        <div className="w-[120px] h-[1px] bg-yellow-500 m-auto"></div>
      </h2>
      {success &&
          <p className="text-center text-xl text-green-400 mt-2 transition-all duration-300 ease-out">product add successfully </p>
      }
          <input
        type='text'
        className='border-[1px] text-gray-500 lg:border-[1px] rounded-lg md:rounded-full  border-gray-600 outline-none px-6 py-3 w-[90%]  m-auto flex my-6 lg:my-8'
        placeholder='product name'
        required
        name="title"
        value={productData.title}
        onChange={productInputHandler.bind(this, 'title')}
      />
      <div className="flex">
      <input
        type='number'
        className='border-[1px] text-gray-500 lg:border-[1px] rounded-lg md:rounded-full  border-gray-600 outline-none px-6 py-3 w-[42%]  m-auto flex  lg:my-8'
        placeholder='price'
        name="price"
        required
        value={productData.price}
        onChange={productInputHandler.bind(this, 'price')}
      />
      <input
        type='number'
        className='border-[1px] text-gray-500 lg:border-[1px] rounded-lg md:rounded-full  border-gray-600 outline-none px-6 py-3 w-[42%]  m-auto flex  lg:my-8'
        placeholder='quantity'
        name="quantity"
        required
        value={productData.quantity}
        // onChange={productInputHandler.bind(this, 'quantity')}
      />
      </div>

      <input
        type='text'
        className='border-[1px] text-gray-500 lg:border-[1px] rounded-lg md:rounded-full  border-gray-600 outline-none px-6 py-3 w-[90%]  m-auto flex my-6 lg:my-8'
        placeholder='image url'
        name="imageUrl"
        required
        value={productData.imageUrl}
        onChange={productInputHandler.bind(this, 'imageUrl')}
      />

    <textarea cols={1} rows={8}  className="text-gray-500 border-[1px] lg:border-[1px] rounded-lg md:rounded-full  border-gray-600 outline-none px-6 py-3 w-[90%]  m-auto flex my-6 lg:my-8" placeholder="description" name="description"
        onChange={productInputHandler.bind(this, 'description')}
        value={productData.description}
    ></textarea>
      {isUpdate ? (
        <button
          className='flex justify-center m-auto mt-5 lg:mt-5  bg-gray-500 w-56 rounded-full text-white  px-2 py-3 2xl:p-3 outline-none transition-all duration-300 ease-in-out hover:bg-[#ffcb05] 2xl:w-[300px] mb-20'
        //   onClick={updateDataHandler}
        >
          Update
        </button>
      ) : (
        <button type="submit"
          className='flex justify-center m-auto mt-5 lg:mt-5  bg-yellow-400 w-56 rounded-full text-white  px-2 py-3 2xl:p-3 outline-none transition-all duration-300 ease-in-out hover:bg-yellow-500 2xl:w-[300px] mb-20'
          onClick={addProductHandler}
        >
          Add
        </button>
      )}
    </form>
    </div>
  )
}

export default AddProduct