
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

const getInitialCart = () => {
  try {
    if (typeof window === "undefined") return [];

    // Use the same cart key throughout the application.
    const savedCart = localStorage.getItem("cartItem");
    const parsedCart = savedCart ? JSON.parse(savedCart) : [];

    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch (error) {
    console.error("Unable to load cart:", error);
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState(getInitialCart);

  // Persist cart changes.
  useEffect(() => {
    try {
      localStorage.setItem("cartItem", JSON.stringify(cartItem));
    } catch (error) {
      console.error("Unable to save cart:", error);
    }
  }, [cartItem]);

  // Add a product or update its quantity.
  const addToCart = (product) => {
    if (!product || product.id == null) {
      toast.error("Invalid product");
      return;
    }

    const requestedQuantity = Math.max(
      1,
      Number(product.quantity) || 1
    );

    const existingItem = cartItem.find(
      (item) => String(item.id) === String(product.id)
    );

    if (existingItem) {
      setCartItem((prevCart) =>
        prevCart.map((item) =>
          String(item.id) === String(product.id)
            ? {
                ...item,
                quantity:
                  (Number(item.quantity) || 1) + requestedQuantity,
              }
            : item
        )
      );

      toast.success("Cart quantity updated");
      return;
    }

    setCartItem((prevCart) => [
      ...prevCart,
      {
        ...product,
        quantity: requestedQuantity,
        originalPrice: product.originalPrice ?? product.price,
      },
    ]);

    toast.success("Item added to cart");
  };

  // Increase or decrease quantity.
  const updateQuantity = (id, action) => {
    setCartItem((prevCart) =>
      prevCart.map((item) => {
        if (String(item.id) !== String(id)) return item;

        const currentQuantity = Number(item.quantity) || 1;

        return {
          ...item,
          quantity:
            action === "increase"
              ? currentQuantity + 1
              : Math.max(1, currentQuantity - 1),
        };
      })
    );
  };

  // Remove a product.
  const removeFromCart = (id) => {
    const exists = cartItem.some(
      (item) => String(item.id) === String(id)
    );

    if (!exists) return;

    setCartItem((prevCart) =>
      prevCart.filter((item) => String(item.id) !== String(id))
    );

    toast.success("Item removed from cart");
  };

  // Clear the cart.
  const clearCart = () => {
    if (cartItem.length === 0) return;

    setCartItem([]);
    toast.info("Cart cleared");
  };

  // Total product quantity.
  const totalItems = cartItem.reduce(
    (total, item) => total + (Number(item.quantity) || 1),
    0
  );

  // Total price.
  const totalPrice = cartItem.reduce(
    (total, item) =>
      total +
      (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItem,
        setCartItem,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
