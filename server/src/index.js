/**
 * Deps.
 */
import Express from "express";
import Helmet from "helmet";
import { createServer } from "http";
import { json as ParseJSON } from "body-parser";
// import AccountLoginHandle from "./handle/accountLogin";
import AccountCreateHandle from "./handle/accountCreate";
import { checkTokenMiddleware } from "./services/JSONWebTokens.js";
/**
 * Setup.
 */
const app = Express();
app.use(Helmet());
app.use(ParseJSON());

/**
 * Routes.
 */
// app.post("/restroomrate/account/login", AccountLoginHandle);
app.post("/restroomrate/account/create", AccountCreateHandle);
// app.post("/restroomrate/account/get", AccountGetHandle);

app.all("*", (req, res) => {
  res.json({
    message: "not found 11 rbo haha",
    status: false
  });
});

/**
 * Start.
 */
createServer(app).listen(process.env.PORT);
