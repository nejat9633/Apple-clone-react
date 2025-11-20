import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function IphoneDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:1234/view/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setProduct(result.data[0]);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <p>Product not found</p>;

  return (
    <>
      <div className="m-5 pt-5 text-center">
        <h2>{product.product_name}</h2>
        <p>{product.Product_brief_description}</p>
      </div>
      <div className=" container row d-flex justify-content-center align-items-center mb-5 mx-5">
        <div className="col-6 small text-center">
          <p className="m-0">Starting at {product.starting_price}</p>
          <p className="m-0">{product.price_range}</p>
          <p className="m-0">{product.Product_description}</p>
        </div>
        <div className="col-6 text-center ">
          <img src={product.product_url} alt={product.product_name} />
        </div>
      </div>
     
    </>
  );
}

export default IphoneDetail;
