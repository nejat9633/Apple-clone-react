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
      <div className="m-5 pt-2">
        {iphones?.data?.map((iphone, index) => {
          return (
            <div key={index} className={`${style.main} `}>
              <div className={`${style.image} `}>
                <img src={iphone.product_url} alt={iphone.product_name} />
              </div>
              <div className={`${style.detail} `}>
                <h2>{iphone.product_name}</h2>
                <p>{iphone.Product_brief_description}</p>
                <p>Starting at {iphone.starting_price}</p>
                <p>{iphone.price_range}</p>
                <a href="#">Learn more </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Iphone;
