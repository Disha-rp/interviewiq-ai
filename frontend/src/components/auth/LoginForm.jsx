import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { login } from "../../services/authService";

function LoginForm() {
  const [values, setValues] = useState({ email: '', password: '', remember: false });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    const nextErrors = {};

    if (!values.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!values.password.trim()) {
      nextErrors.password = 'Password is required.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  if (!validate()) {
    return;
  }

  setIsSubmitting(true);

  try {
    const response = await login({
      email: values.email,
      password: values.password,
    });

    console.log("Login Success:", response);

    localStorage.setItem("access", response.access);
    localStorage.setItem("refresh", response.refresh);

    navigate("/dashboard");
  } catch (error) {
    console.error(error);

    const message =
    error.response?.data?.non_field_errors?.[0] ||
    error.response?.data?.detail ||
    "Invalid email or password.";

setErrors({
  password: message,
});
  } finally {
    setIsSubmitting(false);
  }
};

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setValues((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: '' }));
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <div className="space-y-4">
        <Input
          label="Email"
          id="email"
          name="email"
          type="email"
          placeholder="name@example.com"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          autoComplete="email"
        />

        <Input
          label="Password"
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="current-password"
        />
      </div>

      <div className="flex items-center justify-between gap-3 text-sm">
        <label className="flex items-center gap-2 text-[#64748B]">
          <input
            type="checkbox"
            name="remember"
            checked={values.remember}
            onChange={handleChange}
            className="h-4 w-4 rounded border-[#E2E8F0] text-[#0F4C81] focus:ring-[#3B82F6]"
          />
          <span>Remember me</span>
        </label>

        <Link
  to="/forgot-password"
  className="font-medium text-[#3B82F6] hover:text-[#0F4C81]"
>
  Forgot password?
</Link>
      </div>

      <Button type="submit" loading={isSubmitting} className="w-full">
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </Button>

      <p className="text-center text-sm text-[#64748B]">
        Don&apos;t have an account?{' '}
        <Link
  to="/register"
  className="font-semibold text-[#0F4C81] hover:text-[#3B82F6]"
>
  Create one
</Link>
      </p>
    </form>
  );
}

export default LoginForm;
