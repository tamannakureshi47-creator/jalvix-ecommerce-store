
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NewDataContext } from "../context/NewDataContext";

const Category = () => {
  const context = useContext(NewDataContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("Category must be inside NewDataProvider.");
  }

  const { data = [], loading, error } = context;

  const allowedCategories = [
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
  ];

  const availableCategories = new Set(
    data.map((product) => String(product.category || "").toLowerCase())
  );

  const categories = allowedCategories.filter((category) =>
    availableCategories.has(category)
  );

  const handleCategoryClick = (category) => {
    navigate(`/category/${encodeURIComponent(category)}`);
  };

  if (loading) {
    return (
      <section className="bg-[#101829] py-8">
        <p className="text-center text-sm text-gray-300">
          Loading categories...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-[#101829] py-8">
        <p className="text-center text-sm text-red-300">
          Unable to load categories.
        </p>
      </section>
    );
  }

  return (
    <section className="category-strip">
      <div className="category-strip__inner">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => handleCategoryClick(category)}
            className="category-chip"
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Category;
