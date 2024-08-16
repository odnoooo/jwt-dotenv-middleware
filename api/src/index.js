const express = require("express");
const cors = require("cors");
const { accountRouter } = require("./routes/account.route");
const { categoryRouter } = require("./routes/category.route");
const { authMiddleware } = require("./middlewares/auth.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use(authMiddleware);

app.use("/accounts", accountRouter);
app.use("/categories", categoryRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3001, () => {
  console.log("Example app listening on port 3001");
});
