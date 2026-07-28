import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    if (!email.trim()) {
      setError('Email is required.');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address.');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    window.setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
    }, 1000);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <Input
        label="Email"
        id="email"
        name="email"
        type="email"
        placeholder="name@example.com"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          if (error) {
            setError('');
          }
        }}
        error={error}
        autoComplete="email"
      />

      <Button type="submit" loading={isSubmitting} className="w-full">
        {isSubmitting ? 'Sending...' : 'Send reset link'}
      </Button>

      <p className="text-center text-sm text-[#64748B]">
        <a href="#" className="font-semibold text-[#0F4C81] hover:text-[#3B82F6]">
          Back to Sign In
        </a>
      </p>
    </form>
  );
}

export default ForgotPasswordForm;
