// pages/category.js
"use client";
import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import {
  TrashIcon,
  PencilSquareIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

const Category = () => {
  const [categories, setCategories] = useState(
    localStorage.getItem("categories")
      ? JSON.parse(localStorage.getItem("categories"))
      : []
  );
  const [categoryName, setCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

  const handleCategoryNameChanges = (e) => {
    console.log("Event:", e);
    setCategoryName(e.target.value);
  };

  const addCategory = () => {
    const newCategory = { id: categories.length + 1, name: categoryName };
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    setCategoryName("");
  };

  useEffect(() => {
    console.log("Categories", categories);
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const deleteCategory = (categoryId) => {
    const updatedCategories = categories.filter(
      (category) => category.id !== categoryId
    );
    setCategories(updatedCategories);
  };

  const editCategory = (category) => {
    console.log("Category", category);
    setEditingCategory(category);
    setCategoryName(category?.name || "");
  };

  const saveEditingCategory = () => {
    const updatedCategories = categories.map((category) => {
      if (category.id === editingCategory.id) {
        const updatedCategory = { ...category, name: categoryName };
        return updatedCategory;
      }
      return category;
    });
    setCategories(updatedCategories);
    setEditingCategory(null);
    setCategoryName("");
  };

  return (
    <div className="min-h-full">
      <Nav selected="Categories" />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              <span className="align-top">Categories</span>
            </h1>
            <div>
              <input
                type="text"
                value={categoryName}
                placeholder="Enter category name..."
                onChange={handleCategoryNameChanges}
                className=" w-100 mr-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
              />
              <span>
                {editingCategory ? (
                  <span>
                    <button
                      onClick={saveEditingCategory}
                      className="inline-flex mr-3 w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => editCategory(null)}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      Cancel
                    </button>
                  </span>
                ) : (
                  <button
                    onClick={addCategory}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Create
                  </button>
                )}
              </span>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <ul role="list" className="divide-y divide-gray-100">
            {categories.map((category) => (
              <li
                key={category.id}
                className="flex justify-between gap-x-6 py-5 todo-list"
              >
                <div className="flex min-w-0 gap-x-2">
                  <InformationCircleIcon
                    aria-hidden="true"
                    className="h-10 w-10 flex-none rounded-full"
                  />
                  <div className="min-w-0 flex-auto">
                    <p
                      className="text-sm font-semibold leading-6"
                      style={{ paddingTop: "8px" }}
                    >
                      <span>{category.name}</span>
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <PencilSquareIcon
                    aria-hidden="true"
                    className="h-6 w-6 mb-2"
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={(e) => editCategory(category)}
                  />
                  <TrashIcon
                    aria-hidden="true"
                    className="h-6 w-6"
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => deleteCategory(category.id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Category;
