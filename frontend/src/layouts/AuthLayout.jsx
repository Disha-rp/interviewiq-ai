import Logo from '../components/common/Logo';
import Container from '../components/common/Container';
import Navbar from '../components/navigation/Navbar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

function AuthLayout({
  children,
  eyebrow = 'Authentication',
  title = 'Secure your next interview with a polished workspace.',
  description = 'A premium experience for candidates, teams, and hiring partners to move from preparation to insight.',
}) {
  const highlights = [
    {
      title: 'Resume intelligence',
      subtitle: 'Structured insights prepared for later review.',
    },
    {
      title: 'Interview readiness',
      subtitle: 'A clear path to preparation and progress tracking.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <Navbar
        logo={<Logo />}
        links={[
          { label: 'Overview', href: '#overview', active: true },
          { label: 'Product', href: '#product' },
          { label: 'Support', href: '#support' },
        ]}
        actions={<Button variant="secondary" className="px-3 py-2">Need help?</Button>}
      />

      <Container as="main" className="py-8 sm:py-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <section className="rounded-[32px] border border-[#E2E8F0] bg-white p-8 shadow-[0_8px_30px_rgba(15,76,129,0.06)] sm:p-10 lg:p-12">
            <div className="max-w-2xl space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#3B82F6]">
                {eyebrow}
              </p>
              <h1 className="text-3xl font-semibold leading-tight text-[#0F172A] sm:text-4xl">
                {title}
              </h1>
              <p className="text-base leading-7 text-[#64748B]">{description}</p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {highlights.map((item) => (
                <Card key={item.title} title={item.title} subtitle={item.subtitle} className="p-5" />
              ))}
            </div>
          </section>

          <div className="flex justify-center">
            <Card className="w-full max-w-[480px] p-6 sm:p-8 lg:p-10">
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#3B82F6]">
                    Welcome
                  </p>
                  <h2 className="text-2xl font-semibold text-[#0F172A]">
                    Continue to your workspace
                  </h2>
                  <p className="text-sm leading-6 text-[#64748B]">
                    The authentication form will be mounted here when it is ready.
                  </p>
                </div>

                <div className="rounded-[20px] border border-dashed border-[#E2E8F0] bg-[#F8FAFC] p-6 text-sm leading-6 text-[#64748B]">
                  {children}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AuthLayout;
