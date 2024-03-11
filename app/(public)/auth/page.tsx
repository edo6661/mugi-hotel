import React from "react";
import RegisterForm from "./_components/RegisterForm";
import LoginForm from "./_components/LoginForm";

const Authentication = () => {
  return (
    <section>
      <article className="container px-4 space-y-12">
        <RegisterForm />
        <LoginForm />
      </article>
    </section>
  );
};

export default Authentication;
