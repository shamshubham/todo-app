import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AddTodo = ({
  updateTodoList,
  todoList,
  editTodoDetails,
  onClose,
  user,
}) => {
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
    <div>
      <h2>{editTodo ? "Edit Todo" : "Add Todo"}</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Create Todo ..."
          value={todoName}
          onInput={handleInputValidations}
          onChange={(e) => setTodoName(e.target.value)}
        />
        <div className="validationError">
          {validationErrors && validationErrors.todoName}
        </div>
        <select
          value={todoCategoryId}
          onChange={(e) => setTodoCategoryId(e.target.value)}
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
        <br />
        <br />
        <div>
          <span>Todo Note: </span>
          <textarea
            value={todoNote}
            placeholder="Write todo node here ..."
            onInput={handleInputValidations}
            onChange={(e) => setTodoNote(e.target.value)}
          />
        </div>
        <br />
        <div>
          <span>Todo Date: </span>
          <input
            type="date"
            value={todoDate}
            onChange={(e) => setTodoDate(e.target.value)}
          />
        </div>
        <br />
        <div>
          <span>Todo Type: </span>

          {Object.keys(todoType).map((type) => (
            <span key={type}>
              <input
                name="type"
                type="checkbox"
                value={type}
                checked={todoType[type]}
                onChange={(e) =>
                  setTodoType({ ...todoType, [type]: e.target.checked })
                }
              />{" "}
              <label>{type}</label>
            </span>
          ))}
        </div>
        <br />
        <div>
          <span>Todo priority: </span>
          {priorities.map((priority) => (
            <span key={priority}>
              <input
                name="priority"
                type="radio"
                value={priority}
                checked={todoPriority === priority}
                onChange={(e) => setTodoPriority(e.target.value)}
              />{" "}
              <label>{priority}</label>
            </span>
          ))}
        </div>
        <br />
        <div>
          <span>Todo Order: {todoOrder} </span>
          <input
            type="range"
            value={todoOrder}
            min={1}
            max={10}
            onChange={(e) => setTodoOrder(e.target.value)}
          />
        </div>
        <br />
        <div>
          <span>Email:</span>
          <input
            type="email"
            placeholder="Enter your email address..."
            value={todoEmail}
            onChange={(e) => setTodoEmail(e.target.value)}
          />
        </div>
        <div>
          <span>Website:</span>
          <input
            type="url"
            placeholder="Enter your website address..."
            value={todoWebsite}
            onChange={(e) => setTodoWebsite(e.target.value)}
          />
        </div>
        <div>
          <span>Mobile:</span>
          <input
            type="tel"
            placeholder="Enter your mobile number..."
            value={todoMobile}
            onChange={(e) => setTodoMobile(e.target.value)}
          />
        </div>
        <div>
          <span>Number:</span>
          <input
            type="number"
            placeholder="Enter number..."
            value={todoNumber}
            onChange={(e) => setTodoNumber(e.target.value)}
          />
        </div>
        <div>
          <span>Color:</span>
          <input
            type="color"
            placeholder="Choose todo color..."
            value={todoColor}
            onChange={(e) => setTodoColor(e.target.value)}
          />
        </div>
        <div>
          <span>Image:</span>
          <input type="file" onChange={handleFileChange} />
        </div>
        <span>
          {editTodo ? (
            <span>
              <button type="submit">Save</button>
              <button type="button" onClick={() => onClose()}>
                Cancel
              </button>
            </span>
          ) : (
            <button type="submit">Add</button>
          )}
        </span>
      </form>
    </div>
  );
};

export default AddTodo;
