import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Product() {
  return (
    <div>
      <div className="product-nav">
        <Link className="product-link" to="man/1">Man</Link>
        <Link className="product-link" to="woman">Woman</Link>
      </div>

      <Outlet />
    </div>
  )
}

export default Product