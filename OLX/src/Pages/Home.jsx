import React from 'react'
import Navbar from './../Components/Navbar'
import ProductList from '../Components/ProductList'
import Footer from './../Components/Footer'

const Home = () => {

  return (
    <div>
        <Navbar/>
        <ProductList />
        <Footer/>
    </div>
  )
}

export default Home