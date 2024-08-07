"use client";
import { useState } from "react";
import TodoDrawer from "./Drawer";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
const TodoList = ({ todos, updateTodoStatus, editTd, deleteTodo }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div>
      <ul role="list" className="divide-y divide-gray-100">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between gap-x-6 py-5 todo-list"
            onClick={() => setIsDrawerOpen(true)}
          >
            <TodoDrawer
              open={isDrawerOpen}
              setOpen={setIsDrawerOpen}
              todoDetails={todo}
            />
            <div className="flex min-w-0 gap-x-4">
              <img
                alt=""
                src={todo.image}
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  <span>{todo.name}</span>
                  <span className="ml-3 mr-3 inline-block bg-blue-500 text-white text-xs font-semibold rounded-full px-2 py-1">
                    {todo.category.name}
                  </span>
                  <span class="inline-block bg-green-500 text-white text-xs font-semibold rounded-full px-2 py-1">
                    {todo.priority}
                  </span>
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  Date : <time dateTime={todo.date}>{todo.date}</time>
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <PencilSquareIcon
                aria-hidden="true"
                className="h-6 w-6 mb-2"
                style={{ color: "blue", cursor: "pointer" }}
                onClick={(e) => editTd(e, todo)}
              />
              <TrashIcon
                aria-hidden="true"
                className="h-6 w-6"
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => deleteTodo(todo.id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
