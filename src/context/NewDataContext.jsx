
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";

export const NewDataContext = createContext(null);

export const useNewData = () => {
  const context = useContext(NewDataContext);

  if (!context) {
    throw new Error("useNewData must be used inside DataProvider.");
  }

  return context;
};

const ALLOWED_CATEGORIES = [
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
];

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAllProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "https://dummyjson.com/products?limit=0"
      );

      const apiProducts = response.data.products;

      if (!Array.isArray(apiProducts)) {
        throw new Error("Invalid product data received.");
      }

      const updatedProducts = apiProducts.map((product) => ({
        ...product,
        id: `dummy-${product.id}`,
        source: "dummyjson",
        name: product.title || "Untitled Product",
        image: product.thumbnail || product.images?.[0] || "",
        images: Array.isArray(product.images)
          ? product.images
          : [],
        category: (product.category || "other").toLowerCase(),
        price: Number(product.price) || 0,
        rating: Number(product.rating) || 0,
      }));

      setData(updatedProducts);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Unable to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  const categoryList = useMemo(() => {
    const availableCategories = new Set(
      data.map((product) => product.category)
    );

    return [
      "All",
      ...ALLOWED_CATEGORIES.filter((category) =>
        availableCategories.has(category)
      ),
    ];
  }, [data]);

  const maxPrice = useMemo(() => {
    if (!data.length) return 0;

    return Math.max(
      ...data.map((product) => Number(product.price) || 0)
    );
  }, [data]);

  const value = useMemo(
    () => ({
      data,
      setData,
      loading,
      error,
      fetchAllProducts,
      categoryList,
      maxPrice,
    }),
    [
      data,
      loading,
      error,
      fetchAllProducts,
      categoryList,
      maxPrice,
    ]
  );

  return (
    <NewDataContext.Provider value={value}>
      {children}
    </NewDataContext.Provider>
  );
};
