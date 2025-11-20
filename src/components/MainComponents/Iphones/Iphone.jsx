import React, { useEffect, useState } from "react";
import style from './Iphones.module.css'
import { Link } from "react-router-dom";


function Iphone() {
  const [iphones, setIphones] = useState([]);
  useEffect(() => {
    fetch("http://localhost:1234/view")
      .then((res) => res.json())
      .then((data) => setIphones(data))
      .catch((err) => console.error("failed", err));
  }, []);

  return (
    <>
      <div className="m-5 pt-2 container ">
        {iphones?.data?.map((iphone, index) => {
          return (
            <div key={index} className="row p-2 ">
              <div className={`${style.detail} col px-5`}>
                <h3 className="m-0">{iphone.product_name}</h3>
                <p className="m-0">{iphone.Product_brief_description}</p>
                <p className="m-0">Starting at {iphone.starting_price}</p>
                <p className="m-0">{iphone.price_range}</p>
                <Link to={`${iphone.product_id}`}>Learn more </Link>
              </div>
              <div
                className={`${style.image} col ${
                  index % 2 == 0 ? "order-last" : "order-first"
                } `}
              >
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
