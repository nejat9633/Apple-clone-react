import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

app.use(express.json()); //parse incoming request bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "myDBuser",
  password: "1234567",
  database: "myDB",
});


app.listen(1234, () => {
  console.log("server connected and running on: http://localhost:1234/");
});


app.get("/", express.static("."));

// connecting to the db
mysqlConnection.connect((err) => {
  if (err) {
    console.error("Database connectioin failed: ", err.message);
    return;
  } else console.log("connected to the db");
});

app.get("/view", (req, res) => {

  let selectProduct = `SELECT 
  p.product_id,
  p.product_name,
  p.product_url,

  d.product_brief_description,
  d.Description_id,
  d.Product_description,
  d.Product_img,
  d.Product_link,

  pp.price_id,
  pp.starting_price,
  pp.price_range

FROM products p
INNER JOIN description d ON p.product_id = d.product_id
INNER JOIN productprice pp ON p.product_id = pp.product_id;
`;
  mysqlConnection.query(selectProduct, (err, results) => {
    if (err) {
      console.log("error while selecting " + err);
    }
    res.status(200).json({
      count: results.length,
      data: results,
    });
  });
});

app.get("/view/:id", (req, res) => {
  let selectProduct = `SELECT 
 *
FROM products p
INNER JOIN description d ON p.product_id = d.product_id
INNER JOIN productprice pp ON p.product_id = pp.product_id
INNER JOIN orders o ON p.product_id = o.product_id

WHERE p.product_id = ?
;
`;

 const productId = req.params.id;

  mysqlConnection.query(selectProduct, [productId], (err, results) => {
    if (err) {
      console.log("error while selecting " + err);
    }
    res.status(200).json({
      count: results.length,
      data: results,
    }
    
  );
  });
});
