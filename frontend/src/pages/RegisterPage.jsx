import AuthLayout from '../layouts/AuthLayout';
import RegisterForm from '../components/auth/RegisterForm';

function RegisterPage() {
  return (
    <AuthLayout
      eyebrow="Create account"
      title="Start building your next professional milestone."
      description="A polished workspace for your preparation journey, designed to feel premium from the first step."
    >
      <RegisterForm />
    </AuthLayout>
  );
}

export default RegisterPage;
