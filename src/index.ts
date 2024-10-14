import dotenv from "dotenv";
import { app } from "./app";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT;

app.listen(port || 4000, () => {
  console.log("Server is running on port", port);
});
