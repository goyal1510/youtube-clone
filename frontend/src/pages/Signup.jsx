import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/VideoContext";

const SignUp = () => {
  const { setIsAuthenticated, setUsername } = useContext(AuthContext);
  const [username, setUser] = useState("");  // Fix username state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        setIsAuthenticated(true);
        setUsername(data.username);
        navigate("/"); // Redirect after sign-up
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Signup failed", err);
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <section>
        <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen w-[50vw]">
          <h4 className="text-2xl font-semibold text-white mb-4">Sign Up</h4>
          <div className="w-full bg-gray-800 border-gray-700 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6">
              <form onSubmit={handleSignup}>
                <div>
                  <label className="block mb-2 text-md text-white">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUser(e.target.value)}
                    className="w-full p-2.5 bg-gray-700 text-white border-gray-600 rounded-lg mb-2"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-md text-white">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 bg-gray-700 text-white border-gray-600 rounded-lg mb-2"
                    placeholder="abc@gmail.com"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-md text-white">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2.5 bg-gray-700 text-white border-gray-600 rounded-lg mb-2"
                    required
                  />
                </div>
                <button type="submit" className="w-full text-white bg-blue-600 p-2 rounded-lg mt-4">
                  Sign Up
                </button>
                <p className="text-sm text-gray-400 mt-2">
                  Already have an account?{" "}
                  <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/login")}>
                    Log in
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
