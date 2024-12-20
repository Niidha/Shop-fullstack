import{model,Schema} from "mongoose"
const cartSchema=new Schema({
   
    userId: { type: String, required: true }, 
    products: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
  });

export const Cart =model("cart",cartSchema);