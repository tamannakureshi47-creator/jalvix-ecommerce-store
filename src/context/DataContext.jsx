
import {
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAllProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "https://fakestoreapi.com/products"
      );

      const products = response.data.map((item) => ({
        ...item,
        id: `fs-${item.id}`,
        source: "fakestore",
        name: item.title || "Untitled Product",
        image: item.image || "",
        images: item.image ? [item.image] : [],
        category: (item.category || "other").toLowerCase(),
        price: Number(item.price) || 0,
        rating: Number(item.rating?.rate) || 0,
        stock: null,
      }));

      setData(products);
    } catch (err) {
      console.error("Error fetching FakeStore products:", err);
      setError("Unable to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        loading,
        error,
        fetchAllProducts,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
