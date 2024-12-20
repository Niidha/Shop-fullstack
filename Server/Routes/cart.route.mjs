import { Router } from "express";
import cartController from "../Controller/cart.controller.mjs";


const cartRoute = Router();

cartRoute.post("/add", cartController.addToCart);
cartRoute.get("/:userId",  cartController.getCart);
cartRoute.post("/remove",  cartController.removeFromCart);

export default cartRoute;
