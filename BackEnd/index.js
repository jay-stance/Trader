const express = require("express");
const connectDB = require("./startup/db");
const auth = require("./routes/auth");
const users = require("./routes/users");
const profile = require("./routes/profile");
const posts = require("./routes/posts");

const app = express();

// CONNECT TO DATABASE
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API RUNNING");
});

// DEFINE ROUTES
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`SERVER STARTED ON PORT: ${PORT}`));
