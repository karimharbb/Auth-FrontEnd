import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface RegisterModel {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const [formData, setFormData] = useState<RegisterModel>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [feedback, setFeedback] = useState<string>("");

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
    setFeedback("");
  };

  const clearForm = () => {
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (name.trim().length < 3) {
      setFeedback("Name should have at least 3 characters.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFeedback("Invalid email format.");
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setFeedback(
        "Password must be 8+ chars and include a letter, number, and special symbol."
      );
      return;
    }

    if (password !== confirmPassword) {
      setFeedback("Passwords don’t match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 409) {
        setFeedback("This email is already registered.");
        return;
      }

      if (!response.ok) {
        setFeedback("Signup failed. Please try again later.");
        return;
      }

      setFeedback("🎉 Account created successfully!");
      clearForm();

      setTimeout(() => {
        navigate("/signin");
      }, 1200);
    } catch (error) {
      console.error("Signup error:", error);
      setFeedback("Unexpected error. Please retry.");
    }
  };

  return (
    <>
      <form className="card" onSubmit={handleSubmit}>
        <h2>Register New Account</h2>

        <label>Full Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          id="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label>Email Address</label>
        <input
          type="text"
          placeholder="Enter your email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Create a password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          placeholder="Repeat password"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <button type="submit">Sign Up</button>
        <div className="social">
          {feedback && <p id="feedbackMessage">{feedback}</p>}
          <br />
          <h4>
            Already have an account? <Link to="/signin">Log in</Link>
          </h4>
        </div>
      </form>
    </>
  );
};

export default SignUp;
