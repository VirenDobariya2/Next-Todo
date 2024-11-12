"use client";

import { Context } from "@/components/Clients";

import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { user, setUser } = useContext(Context);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      setUser(data.user);
      toast.error(data.message);
    } catch (error) {
      return toast.error(error);
    }
  };

  if (user._id) return redirect("/");

  return (
    <div className="login">
      <section>
        <form onSubmit={loginHandler}>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            type="email"
            placeholder="Enter Email"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            type="possword"
            placeholder="Enter Password"
          />

          <button type="submit">Login</button>
          <p>OR</p>
          <Link href={"/register"}>New User</Link>
        </form>
      </section>
    </div>
  );
};

// export const metadata = {
//     title: "Login",
//     description: "This is the login Todo App Project made by NExt.js",
//   };

export default page;
