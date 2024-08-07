"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

export default function TodoModal({
  open,
  setOpen,
  updateTodoList,
  todoList,
  editTodoDetails,
  onClose,
  user,
}) {
  if (!open) return null;

  const [categories, setCategories] = useState(
    localStorage.getItem("categories")
      ? JSON.parse(localStorage.getItem("categories"))
      : []
  );
  const [todoName, setTodoName] = useState("");
  const [todoCategoryId, setTodoCategoryId] = useState("");
  const [editTodo, setEditTodo] = useState(null);
  const [todoNote, setTodoNote] = useState("");
  const [todoDate, setTodoDate] = useState("");
  const defaultTodoTypes = {
    office: false,
    personal: false,
    family: false,
  };
  const [todoType, setTodoType] = useState(defaultTodoTypes);
  const priorities = ["low", "medium", "high", "urgent"];
  const defaultPriority = "medium";
  const [todoPriority, setTodoPriority] = useState(defaultPriority);
  const defaultTodoOrder = 5;
  const [todoOrder, setTodoOrder] = useState(defaultTodoOrder);
  const [todoEmail, setTodoEmail] = useState("");
  const [todoWebsite, setTodoWebsite] = useState("");
  const [todoMobile, setTodoMobile] = useState("");
  const [todoNumber, setTodoNumber] = useState("");
  const [todoColor, setTodoColor] = useState("#ffffff");
  const [todoImage, setTodoImage] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const addTodo = () => {
    const category = categories.find(
      (category) => category.id === parseInt(todoCategoryId)
    );
    updateTodoList([
      ...todoList,
      {
        id: todoList.length + 1,
        name: todoName,
        category: category,
        note: todoNote,
        date: todoDate,
        type: todoType,
        priority: todoPriority,
        order: todoOrder,
        status: "pending",
        email: todoEmail,
        website: todoWebsite,
        mobile: todoMobile,
        number: todoNumber,
        color: todoColor,
        image: todoImage,
        userId: user.id,
      },
    ]);
    setTodoName("");
    setTodoCategoryId("");
    setTodoNote("");
    setTodoDate("");
    setTodoType(defaultTodoTypes);
    setTodoPriority(defaultPriority);
    setTodoOrder(defaultTodoOrder);
    setTodoEmail("");
    setTodoWebsite("");
    setTodoMobile("");
    setTodoNumber("");
    setTodoColor("");
    setTodoImage("");
    toast.success("Todo added successfully");
    onClose();
  };

  const fillEditTodoDetails = (todo) => {
    setEditTodo(todo);
    setTodoName(todo?.name || "");
    setTodoCategoryId(todo?.category?.id || "");
    setTodoNote(todo?.note || "");
    setTodoDate(todo?.date || "");
    setTodoType(todo?.type || defaultTodoTypes);
    setTodoPriority(todo?.priority || defaultPriority);
    setTodoOrder(todo?.order || defaultTodoOrder);
    setTodoEmail(todo?.email || "");
    setTodoWebsite(todo?.website || "");
    setTodoMobile(todo?.mobile || "");
    setTodoNumber(todo?.number || "");
    setTodoColor(todo?.color || "");
    setTodoImage(todo?.image || "");
  };

  const updateTodo = () => {
    const category = categories.find(
      (category) => category.id === parseInt(todoCategoryId)
    );
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === editTodo.id) {
        return {
          ...todo,
          name: todoName,
          category: category,
          note: todoNote,
          date: todoDate,
          type: todoType,
          priority: todoPriority,
          order: todoOrder,
          email: todoEmail,
          website: todoWebsite,
          mobile: todoMobile,
          number: todoNumber,
          color: todoColor,
          image: todoImage,
        };
      }
      return todo;
    });
    updateTodoList(updatedTodos);
    setEditTodo(null);
    setTodoName("");
    setTodoCategoryId("");
    setTodoNote("");
    setTodoDate("");
    setTodoType(defaultTodoTypes);
    setTodoPriority(defaultPriority);
    setTodoOrder(defaultTodoOrder);
    setTodoEmail("");
    setTodoWebsite("");
    setTodoMobile("");
    setTodoNumber("");
    setTodoColor("");
    setTodoImage("");
    onClose();
    toast.success("Todo updated successfully");
  };

  useEffect(() => {
    console.log("editTodoDetails", editTodoDetails);
    if (editTodoDetails) {
      fillEditTodoDetails(editTodoDetails);
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTodoImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputValidations = (e) => {
    e.target.value = e.target.value.toUpperCase();
  };

  const isFormValid = () => {
    const errors = {};
    !todoName && (errors.todoName = "Todo name is required");
    !todoCategoryId && (errors.todoCategoryId = "Category is required");
    !todoNote && (errors.todoNote = "Note is required");
    !todoDate && (errors.todoDate = "Date is required");
    !todoEmail && (errors.todoEmail = "Email is required");
    !todoWebsite && (errors.todoWebsite = "Website is required");
    !todoMobile && (errors.todoMobile = "Mobile is required");
    !todoNumber && (errors.todoNumber = "Number is required");
    !todoColor && (errors.todoColor = "Color is required");
    !todoImage && (errors.todoImage = "Image is required");
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return false;
    }

    return true;
  };

  const handleFormSubmit = (e) => {
    console.log("editTodo", editTodo);

    e.preventDefault();
    if (!isFormValid()) {
      toast.error("Please fill all the required fields");
      return;
    }
    if (editTodo) {
      updateTodo();
    } else {
      addTodo();
    }
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationTriangleIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-red-600"
                  />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    {editTodo ? "Edit Todo" : "Add Todo"}
                  </DialogTitle>
                  <div className="mt-2">
                    <form
                      onSubmit={handleFormSubmit}
                      name="todoForm"
                      id="todoForm"
                    >
                      <input
                        type="text"
                        placeholder="Create Todo ..."
                        value={todoName}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                        onChange={(e) => setTodoName(e.target.value)}
                      />
                      <div className="validationError">
                        {validationErrors && validationErrors.todoName}
                      </div>
                      <select
                        value={todoCategoryId}
                        onChange={(e) => setTodoCategoryId(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                      >
                        <option value="" disabled>
                          Select A Category
                        </option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      <div className="validationError">
                        {validationErrors && validationErrors.todoCategoryId}
                      </div>
                      <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Todo Note:{" "}
                        </label>
                        <textarea
                          value={todoNote}
                          placeholder="Write todo node here ..."
                          onChange={(e) => setTodoNote(e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Todo Date:{" "}
                        </label>
                        <input
                          type="date"
                          value={todoDate}
                          onChange={(e) => setTodoDate(e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium leading-6 text-gray-900 align-top mr-2.5">
                          Todo Type:{" "}
                        </label>

                        {Object.keys(todoType).map((type) => (
                          <span key={type}>
                            <input
                              name="type"
                              type="checkbox"
                              value={type}
                              checked={todoType[type]}
                              onChange={(e) =>
                                setTodoType({
                                  ...todoType,
                                  [type]: e.target.checked,
                                })
                              }
                              className="form-checkbox h-3 w-3 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />{" "}
                            <label className="text-sm font-medium leading-6 text-gray-900 align-top mr-2.5">
                              {type}
                            </label>
                          </span>
                        ))}
                      </div>
                      <div>
                        <label className="text-sm font-medium leading-6 text-gray-900 align-top mr-2.5">
                          Todo priority:{" "}
                        </label>
                        {priorities.map((priority) => (
                          <span key={priority}>
                            <input
                              name="priority"
                              type="radio"
                              value={priority}
                              checked={todoPriority === priority}
                              onChange={(e) => setTodoPriority(e.target.value)}
                              className="form-radio h-3 w-3 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />{" "}
                            <label className="text-sm font-medium leading-6 text-gray-900 align-top mr-2.5">
                              {priority}
                            </label>
                          </span>
                        ))}
                      </div>
                      <div>
                        <label className="text-sm font-medium leading-6 text-gray-900 align-top mr-2.5">
                          Todo Order: {todoOrder}{" "}
                        </label>
                        <input
                          type="range"
                          value={todoOrder}
                          min={1}
                          max={10}
                          onChange={(e) => setTodoOrder(e.target.value)}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          style={{ width: "250px" }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Email:
                        </label>
                        <input
                          type="email"
                          placeholder="Enter your email address..."
                          value={todoEmail}
                          onChange={(e) => setTodoEmail(e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Website:
                        </label>
                        <input
                          type="url"
                          placeholder="Enter your website address..."
                          value={todoWebsite}
                          onChange={(e) => setTodoWebsite(e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Mobile:
                        </label>
                        <input
                          type="tel"
                          placeholder="Enter your mobile number..."
                          value={todoMobile}
                          onChange={(e) => setTodoMobile(e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Number:
                        </label>
                        <input
                          type="number"
                          placeholder="Enter number..."
                          value={todoNumber}
                          onChange={(e) => setTodoNumber(e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium leading-6 text-gray-900 align-top">
                          Color:
                        </label>
                        <input
                          type="color"
                          placeholder="Choose todo color..."
                          value={todoColor}
                          onChange={(e) => setTodoColor(e.target.value)}
                          className="w-12 h-12 p-0 border-none cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium leading-6 text-gray-900 mr-2.5">
                          Image:
                        </label>
                        <input
                          type="file"
                          onChange={handleFileChange}
                          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:bg-blue-50 file:text-blue-700 file:cursor-pointer file:hover:bg-blue-100"
                          style={{ width: "250px" }}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="submit"
                form="todoForm"
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                {editTodo ? "Update Todo" : "Create Todo"}
              </button>
              <button
                type="cancel"
                data-autofocus
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
