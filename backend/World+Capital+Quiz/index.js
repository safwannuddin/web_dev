import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

// Database configuration
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "safwan_world",
    password: "@safwan19",
    port: 5432,
});

// Connect to the database
db.connect()
    .then(() => console.log("Connected to the database"))
    .catch((err) => console.error("Database connection error:", err.stack));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs"); // Ensure you have ejs installed

// Quiz data
let quiz = [];
let currentQuestion = {};
let totalCorrect = 0;

// Fetch quiz data from the database at startup
async function loadQuizData() {
    try {
        const result = await db.query("SELECT * FROM capitals");
        quiz = result.rows;
        console.log("Quiz data loaded:", quiz);
    } catch (err) {
        console.error("Error fetching quiz data:", err.stack);
    }
}

// Fetch a random question
function nextQuestion() {
    if (quiz.length > 0) {
        currentQuestion = quiz[Math.floor(Math.random() * quiz.length)];
    } else {
        currentQuestion = { country: "No data", capital: "" }; // Default fallback
    }
}

// Routes
app.get("/", async (req, res) => {
    totalCorrect = 0;
    nextQuestion();
    res.render("index.ejs", { question: currentQuestion });
});

app.post("/submit", (req, res) => {
    const answer = req.body.answer.trim();
    const isCorrect =
        currentQuestion.capital.toLowerCase() === answer.toLowerCase();

    if (isCorrect) {
        totalCorrect++;
    }

    nextQuestion();
    res.render("index.ejs", {
        question: currentQuestion,
        wasCorrect: isCorrect,
        totalScore: totalCorrect,
    });
});

// Start the server
app.listen(port, async () => {
    console.log(`Server is running at http://localhost:${port}`);
    await loadQuizData(); // Ensure quiz data is loaded before handling requests
});
