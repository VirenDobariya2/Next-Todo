"use client";

import { Context } from "@/components/Clients";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { user, setUser } = useContext(Context);

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name,
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
        <form onSubmit={registerHandler}>
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            type="text"
            placeholder="Enter Name"
          />
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
          <button type="submit">Sign Up</button>
          <p>OR</p>
          <Link href={"/login"}>Log In</Link>
        </form>
      </section>
    </div>
  );
};

// export const metadata = {
//   title: "Register",
//   description: "This is the register Todo App Project made by NExt.js",
// };

export default page;
