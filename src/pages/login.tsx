import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface UserCredentials {
  email: string;
  password: string;
}

const Login = () => {
  const [form, setForm] = useState<UserCredentials>({
    email: "",
    password: "",
  });
  const [feedback, setFeedback] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setForm({ ...form, [id]: value });
    setFeedback("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.email || !form.password) {
      setFeedback("Email and password are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        setFeedback("Invalid credentials, please try again.");
        return;
      }

      const result = await response.json();
      console.log("User authenticated:", result);
      localStorage.setItem("AccessToken", result.access_token); // Store JWT
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      setFeedback("Unable to connect. Please retry later.");
    }
  };

  return (
    <>
      <form className="card" onSubmit={handleSubmit}>
        <h2>Sign In</h2>

        <label>Email Address</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={form.email}
          id="email"
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          id="password"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit">Login</button>
        <div className="social">
          {feedback && <p>{feedback}</p>}
          <h4>
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </h4>
        </div>
      </form>
    </>
  );
};

export default Login;
