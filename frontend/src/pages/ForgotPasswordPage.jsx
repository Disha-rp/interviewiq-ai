import AuthLayout from '../layouts/AuthLayout';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';

function ForgotPasswordPage() {
  return (
    <AuthLayout
      eyebrow="Reset access"
      title="Recover your account quickly."
      description="Enter the email linked to your account and we’ll guide you through the next step."
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}

export default ForgotPasswordPage;
