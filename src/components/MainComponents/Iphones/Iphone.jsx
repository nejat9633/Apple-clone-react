import React, { useEffect, useState } from "react";
import style from './Iphones.module.css'

function Iphone() {
  const [iphones, setIphones] = useState([]);
  useEffect(() => {
    fetch("http://localhost:1234/view")
      .then((res) => res.json())
      .then((data) => setIphones(data))
      .catch((err) => console.error("failed", err));
  }, []);
  console.log(iphones);

  return (
    <>
      <div className="m-5 pt-2 container ">
        {iphones?.data?.map((iphone, index) => {
          return (
            <div key={index} className='row p-2'>
              <div className={`${style.detail} col px-5`}>
                <h3>{iphone.product_name}</h3>
                <p>{iphone.Product_brief_description}</p>
                <p>Starting at {iphone.starting_price}</p>
                <p>{iphone.price_range}</p>
                <a href="#">Learn more </a>
              </div>
              <div className={`${style.image} col ${index%2 == 0 ? 'order-last': 'order-first'} `}>
                <img src={iphone.product_url} alt={iphone.product_name} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Iphone;
