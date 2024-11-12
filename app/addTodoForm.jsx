"use client";

import { Context } from "@/components/Clients";
import { redirect, useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

const addTodoForm = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const {user} = useContext(Context)

  const router = useRouter();

  const submitHadler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/newtask", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      router.refresh();
      setTitle("");
      setDescription("");
    } catch (error) {
      return toast.error(error);
    }
  };

  if (!user._id) return redirect("/login")

  return (
    <div className="login">
      <section>
        <form onSubmit={submitHadler}>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Task Title"
          />
          <input
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            type="text"
            placeholder="Task Description"
          />
          <button type="submit">Add Task</button>
        </form>
      </section>
    </div>
  );
};

export const metadata = {
  title: "Login",
  description: "This is the login Todo App Project made by NExt.js",
};

export default addTodoForm;
