import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartProvider";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { logoutUser } from "../Redux/userSlice";

const ShopPage = () => {
  const dispatch = useDispatch();
  const { username } = useSelector((store) => store.user);

  const navigate = useNavigate();

  const { cartList, setCartList } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("https://dummyjson.com/products");
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    dispatch(logoutUser());
    navigate("/login");
  };

  const handleAddToCart = (product) => {
    const index = cartList.findIndex((item) => item.id === product.id);
    if (index === -1) {
      product.quantity = 1;
      setCartList([product, ...cartList]);
    } else {
      const updatedCart = cartList.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartList(updatedCart);
    }
    return toast.success("Product added successfully!");
  };

  return (
    <Fragment>
      <div>
        {/* Header Section */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            backgroundColor: "#ffffff",
            zIndex: 1000,
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "50%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ced4da",
            }}
          />

          {/* Cart and Logout Buttons */}
          <div className="d-flex align-items-center">
            <div className="me-3">
              <span style={{ fontWeight: "bold" }}>Hello, {username}</span>
            </div>
            <Link
              to="/cart"
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 15px",
                backgroundColor: "#21D375",
                color: "#fff",
                borderRadius: "5px",
                textDecoration: "none",
                fontWeight: "bold",
                marginRight: "10px",
              }}
            >
              <FaShoppingCart style={{ marginRight: "5px" }} /> Cart ({cartList.length})
            </Link>
            <button
              onClick={handleLogout}
              style={{
                padding: "8px 15px",
                backgroundColor: "#DC3545",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Product List */}
        <div
          style={{ marginTop: "100px" }}
          className="d-flex justify-content-center gap-2 flex-wrap"
        >
          {isLoading ? (
            <p>Loading products...</p>
          ) : filteredProducts.length === 0 ? (
            <p>No products found</p>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} style={{ width: "15rem" }} className="bg-light p-2">
                <div>
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    style={{ width: "15rem", objectFit: "contain", height: "200px" }}
                  />
                </div>
                <div className="text-center">
                  <h6>{product.title}</h6>
                  <div className="w-100 d-flex justify-content-between">
                    <div>
                      <FaStar /> {product.rating}
                    </div>
                    <div>
                      <s className="text-muted">${product.price}</s>{" "}
                      {(product.price * 0.9).toFixed(2)}
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-success p-1 w-100 mt-2 border-0 text-light rounded"
                  >
                    <FaShoppingCart /> Add To Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ShopPage;
