// pages/todo.js
"use client";
import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { toast } from "react-toastify";
import Nav from "../components/Nav";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  PlusIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import TodoModal from "../components/TodoModal";

const Todo = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const getUserTodos = () => {
    if (!user) {
      return [];
    }
    return todos.filter((todo) => todo.userId === user.id);
  };

  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos") || "[]")
  );
  const [userTodos, setUserTodos] = useState(getUserTodos());

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
    setUser(user);
  }, []);

  const [editTodo, setEditTodo] = useState(null);
  useEffect(() => {
    console.log("useEffect", todos);
    localStorage.setItem("todos", JSON.stringify(todos));
    setUserTodos(getUserTodos());
  }, [todos]);

  const deleteTodo = (id) => {
    console.log("deleteTodo", id);
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    toast.warn("Todo deleted successfully");
  };

  const editTd = (e, todo) => {
    e.stopPropagation();
    setEditTodo(todo);
    if (todo) {
      setIsModalOpen(true);
    }
  };

  // Search Functionality
  const [searchInput, setSearchInput] = useState("");
  const [searchedTodoList, setSearchedTodoList] = useState([]);

  const searchInTodo = (e) => {
    setSearchInput(e.target.value);
  };

  const searchTodos = () => {
    console.log("I am here...");
    let sTodoList = [];
    if (searchInput) {
      sTodoList = todos.filter((todo) => {
        if (todo.name.includes(searchInput)) {
          return true;
        }
        return false;
      });
    }
    setSearchedTodoList(sTodoList);
  };

  useEffect(searchTodos, [searchInput]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditTodo(null);
  };

  const updateTodoStatus = (id, status) => {
    const statusToUpdate = status ? "completed" : "pending";
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          status: statusToUpdate,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
    toast.success("Todo status updated successfully");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Nav selected="Dashboard" />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              <span className="align-top">Todo's</span>
              <PlusCircleIcon
                aria-hidden="true"
                className="ml-3 h-8 w-8 inline-block align-top"
                onClick={() => setIsModalOpen(true)}
              />
            </h1>
            <div>
              <input
                type="search"
                placeholder="Search todos ..."
                value={searchInput}
                onChange={searchInTodo}
                className=" w-100 mr-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
              />
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <TodoModal
            open={isModalOpen}
            setOpen={handleModalClose}
            updateTodoList={setTodos}
            todoList={todos}
            editTodoDetails={editTodo}
            onClose={handleModalClose}
            user={user}
          />
          <div>
            <TodoList
              todos={searchInput ? searchedTodoList : userTodos}
              updateTodoStatus={updateTodoStatus}
              editTd={editTd}
              deleteTodo={deleteTodo}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Todo;
