import React from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (!user) return navigate("/sign-in");
  return (
    <div>
      <h1 className="text-4xl">This is Home</h1>
    </div>
  );
};

export default Home;
