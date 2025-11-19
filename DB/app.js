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

// creating tables
// app.get("/install", (req, res) => {
//   // products table
//   let createProducts = `CREATE TABLE if not exists Products(
//   product_id int auto_increment,
//   product_url varchar(255) not null,
//   product_name varchar(255) not null,

//   PRIMARY KEY (product_id)
// )`;

//   //description table
//   let createProductDescription = `CREATE TABLE if not exists Description(
//   Description_id int auto_increment,
//   product_id int not null,
//   Product_brief_description varchar(255) not null,
//   Product_description varchar(255) not null,
//   Product_img varchar(255) not null,
//   Product_link varchar(255) not null,

//   PRIMARY KEY (Description_id),
//   FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE 
// )`;

//   //product price table
//   let createProductPrice = ` CREATE TABLE if not exists ProductPrice (
//   product_id int not null,
//   price_id int auto_increment,
//   starting_price varchar(255) not null,
//   price_range varchar(255) not null,

// PRIMARY KEY (price_id),
//   FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE 

// )`;

//   //user table
//   let createUser = ` CREATE TABLE if not exists User (
//   user_id int auto_increment,
//   User_name varchar(255) not null,
//   User_password varchar(255) not null,

//   PRIMARY KEY (user_id)

// )`;

//   //orders table
//   let createOrders = ` CREATE TABLE if not exists Orders (
//   order_id int auto_increment,
//   product_id int not null,
//   user_id int not null,
//   PRIMARY KEY (order_id),
//   FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE,
// FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE

// )`;

//   mysqlConnection.query(createProducts, (err) => {
//     if (err) {
//       console.error("failed :", err.message);
//       return;
//     }
//   });

//   mysqlConnection.query(createProductDescription, (err) => {
//     if (err) {
//       console.error("failed :", err.message);
//       return;
//     }
//   });

//   mysqlConnection.query(createProductPrice, (err) => {
//     if (err) {
//       console.error("failed :", err.message);
//       return;
//     }
//   });

//   mysqlConnection.query(createUser, (err) => {
//     if (err) {
//       console.error("failed :", err.message);
//       return;
//     }
//   });

//   mysqlConnection.query(createOrders, (err) => {
//     if (err) {
//       console.error("failed :", err.message);
//       return;
//     }
//   });

//   res.send("table created");
// });

// app.post("/add-product", (req, res) => {

//   const {
//     product_name,
//     product_url,
//     product_brief_description,
//     product_description,
//     product_img,
//     product_link,
//     starting_price,
//     price_range,
//     user_name,
//     user_password,
//   } = req.body;

//   //queries to insert into the tables
//   // ? is called a query parameter it is a placeholder

//   let insertProduct = `INSERT INTO Products(product_name,product_url) VALUES (?,?)`;

//   let insertProductDescription = `INSERT INTO Description(product_id, product_brief_description, product_description, product_img, product_link) VALUES (?,?,?,?,?) `;

//   let insertProductPrice = `INSERT INTO ProductPrice(product_id,starting_price,price_range) VALUES(?,?,?) `;

//   let insertUser = ` INSERT INTO User(User_name,User_password) values(?,?)`;

//   let insertOrder = `INSERT INTO Orders(product_id,user_id) VALUES(?,?)`;

//   //inserting into product table
//   mysqlConnection.query(
//     insertProduct,
//     [product_name, product_url],
//     (err, results, fields) => {
//       if (err) console.log(`error inserting into products table ${err}`);

//       let product_id = results.insertId;

//       // inserting into Description table
//       mysqlConnection.query(
//         insertProductDescription,
//         [
//           product_id,
//           product_brief_description,
//           product_description,
//           product_img,
//           product_link,
//         ],
//         (err, results) => {
//           if (err) {
//             console.log(`error inserting into Description table ${err}`);
//             return res.status(500).json({ error: "Database insert failed"});
//           }
//         }
//       );

//       //inserting into productPrice table
//       mysqlConnection.query(
//         insertProductPrice,
//         [product_id, starting_price, price_range],
//         (err) => {
//           if (err)
//             console.log(`error inserting into product price table: ${err}`);
//         }
//       );

//       //inserting into user table
//       mysqlConnection.query(
//         insertUser,
//         [user_name, user_password],
//         (err, results) => {
//           if (err) console.log(`error inserting into user table ${err}`);

//           let user_id = results.insertId; //the generated id of the user

//           //inserting into orders table
//           mysqlConnection.query(insertOrder, [product_id, user_id], (err) => {
//             if (err) console.log(`error inserting into orders table: ${err}`);
//           });
//         }
//       );
//     }
//   );

//   res.send("Inserted into tables successfully!");
// });

//selection

app.get("/view", (req, res) => {
  //selecting with id

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
INNER JOIN productprice pp ON p.product_id = pp.product_id

`;
  mysqlConnection.query(selectProduct, (err, results) => {
    if (err) {
      console.log("error while selecting " + err);
    }

    // console.log(results[0].product_name);
    res.status(200).json({
      count: results.length,
      data: results,
    });
  });
});

// //deletion
// app.post("/delete", (req, res) => {
//   console.log(req.body.user_password);
//   const delete_id = req.body.delete_id;

//   let deleteQuery = `DELETE FROM Products where Products.product_id = ?`;

//   mysqlConnection.query(deleteQuery, [delete_id], (err, results) => {
//     if (err) {
//       console.log(`error while deleting ${err}`);
//       return res.json(err);
//     }

//     res.status(200).json("The Product is successfully deleted.");
//   });
// });

// ALTER TABLE users AUTO_INCREMENT = 1; //to reset the id in the db