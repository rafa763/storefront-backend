import express, { Router } from "express";
import user from "./api/users";
import ord from "./api/orders";
import prod from "./api/products";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("api main route working!");
})

router.use("/users", user);
router.use("/orders", ord);
router.use("/products", prod);

export default router;