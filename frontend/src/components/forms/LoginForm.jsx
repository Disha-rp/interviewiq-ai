import { Link } from "react-router-dom";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

function LoginForm() {
  return (
    <Card>
      <h2 className="text-3xl font-bold text-white text-center">
        Welcome Back
      </h2>

      <p className="text-gray-400 text-center mt-2 mb-8">
        Sign in to InterviewIQ AI
      </p>

      <form className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
        />

        <Button>
          Login
        </Button>
      </form>

      <p className="text-center text-gray-400 mt-6">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-cyan-400 hover:text-cyan-300"
        >
          Register
        </Link>
      </p>
    </Card>
  );
}

export default LoginForm;