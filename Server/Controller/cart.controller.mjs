import { Cart } from "../Model/cart.model.mjs";

const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart if none exists
      cart = new Cart({ userId, products: [{ productId, quantity: 1 }] });
    } else {
      // Update existing cart
      const productIndex = cart.products.findIndex((p) => p.productId === productId);
      if (productIndex === -1) {
        cart.products.push({ productId, quantity: 1 });
      } else {
        cart.products[productIndex].quantity += 1;
      }
    }

    await cart.save();
    return res.status(200).send({
      message: "Product added to cart",
      cart,
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Internal server error",
    });
  }
};

const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await cartCollection.findOne({ userId });
    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }

    return res.status(200).send({
      message: "Cart fetched successfully",
      cart,
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Internal server error",
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await cartCollection.findOne({ userId });
    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }

    cart.products = cart.products.filter((product) => product.productId !== productId);
    await cart.save();

    return res.status(200).send({
      message: "Product removed from cart",
      cart,
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Internal server error",
    });
  }
};

export default { addToCart, getCart, removeFromCart };
