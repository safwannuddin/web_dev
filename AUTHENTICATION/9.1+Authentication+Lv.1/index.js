import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",       // PostgreSQL username
  host: "localhost",      // Host where the database is running
  database: "secrets",   // Name of the PostgreSQL database
  password: "@safwan19",  // Password for the PostgreSQL user
  port: 5432,             // Default PostgreSQL port
});
db.connect();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    // Check if the email already exists in the database
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (checkResult.rows.length > 0) {
      // If email exists, send a message
      res.send("Email already exists. Try logging in.");
    } else {
      // If email does not exist, insert the new user into the database
      const result = await db.query(
        "INSERT INTO users (email, password) VALUES ($1, $2)",
        [email, password]
      );
      
      console.log(result);
      // Redirect the user to the secrets page
      res.render("secrets.ejs");
    }
  } catch (err) {
    console.log(err);
    res.send("An error occurred. Please try again later.");
  }
});


app.post("/login", async (req, res) => {
  const email=req.body.username;
  const password=req.body.password;
 
  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedPassword = user.password;

      if (password === storedPassword) {
        res.render("secrets.ejs");
      } else {
        res.send("Incorrect Password");
      }
    } else {
      res.send("User not found");
    }
  } catch (err) {
    console.log(err);
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
