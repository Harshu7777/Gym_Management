const express = require("express");
const app = express();
const authRouter = require("./routres/authRouter");
const membershipRouter = require("./routres/memberShipRoutes");
const member = require("./routres/memberRouter");
const connectDB = require("./config/db");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");

const path = require("path");

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "*",
}));

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("views"));

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Database Connection
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/membership", membershipRouter);
app.use("/api/member", member);

// 404 Error Handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// General Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
