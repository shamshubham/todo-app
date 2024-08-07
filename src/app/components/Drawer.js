"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const TodoDrawer = ({ open, setOpen, todoDetails }) => {
  if (!open) return null;

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-10 transition-opacity duration-500 ease-in-out"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out sm:duration-700 bg-white shadow-xl"
            >
              <TransitionChild>
                <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex h-full flex-col overflow-y-auto py-6">
                <div className="px-4 sm:px-6">
                  <DialogTitle className="text-lg font-semibold leading-6 text-gray-900">
                    {todoDetails.name}
                  </DialogTitle>
                </div>
                <hr />
                <div className="relative mt-2 flex-1 px-4 sm:px-6 space-y-4">
                  <div className="text-sm leading-6 text-gray-900 todo-items todo-desc">
                    <span>{todoDetails.note}</span>
                  </div>
                  <div className="text-sm font-medium leading-6 text-gray-900 todo-items ">
                    <span>Category:</span>{" "}
                    <span className="todo-values ">
                      {todoDetails.category.name}
                    </span>
                  </div>

                  <div className="text-sm font-medium leading-6 text-gray-900 todo-items">
                    <span>Date:</span>{" "}
                    <span className="todo-values ">{todoDetails.date}</span>
                  </div>
                  <div className="text-sm font-medium leading-6 text-gray-900 todo-items">
                    <span>Type:</span>{" "}
                    <span className="todo-values ">
                      {Object.keys(todoDetails.type)
                        .filter((type) => todoDetails.type[type])
                        .join(", ")}
                    </span>
                  </div>
                  <div className="text-sm font-medium leading-6 text-gray-900 todo-items">
                    <span>Priority:</span>{" "}
                    <span className="todo-values ">{todoDetails.priority}</span>
                  </div>
                  <div className="text-sm font-medium leading-6 text-gray-900 todo-items">
                    <span>Order:</span>{" "}
                    <span className="todo-values ">{todoDetails.order}</span>
                  </div>
                  <div className="text-sm font-medium leading-6 text-gray-900 todo-items">
                    <span>Email:</span>{" "}
                    <span className="todo-values ">{todoDetails.email}</span>
                  </div>
                  <div className="text-sm font-medium leading-6 text-gray-900 todo-items">
                    <span>Website:</span>{" "}
                    <a
                      href={todoDetails.website}
                      className="text-blue-600 hover:underline todo-values "
                    >
                      {todoDetails.website}
                    </a>
                  </div>
                  <div className="text-sm font-medium leading-6 text-gray-900 todo-items">
                    <span>Mobile:</span>{" "}
                    <span className="todo-values ">{todoDetails.mobile}</span>
                  </div>
                  <div className="text-sm font-medium leading-6 text-gray-900 todo-items">
                    <span>Number:</span>{" "}
                    <span className="todo-values ">{todoDetails.number}</span>
                  </div>
                  <div className="text-sm font-medium leading-6 text-gray-900 todo-items">
                    <span>Color:</span>{" "}
                    <span
                      style={{ color: todoDetails.color }}
                      className="todo-values "
                    >
                      {todoDetails.color}
                    </span>
                  </div>
                  <div>
                    <img
                      src={todoDetails.image}
                      alt="Todo"
                      className="mt-2 rounded-md shadow-sm"
                    />
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default TodoDrawer;
