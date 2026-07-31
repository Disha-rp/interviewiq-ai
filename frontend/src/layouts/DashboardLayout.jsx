import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '../components/common/Logo';
import Container from '../components/common/Container';
import Button from '../components/ui/Button';

const navigationItems = [
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Resume', href: '#resume' },
  { label: 'Interviews', href: '#interviews' },
  { label: 'Reports', href: '#reports' },
  { label: 'Settings', href: '#settings' },
];

function DashboardLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="hidden w-72 shrink-0 border-r border-[#E2E8F0] bg-white px-6 py-6 lg:flex lg:flex-col">
          <div className="mb-8">
            <Logo />
          </div>

          <nav aria-label="Sidebar navigation" className="space-y-2">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center rounded-[14px] px-4 py-3 text-sm font-medium text-[#64748B] transition hover:bg-[#F8FAFC] hover:text-[#0F4C81]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="border-b border-[#E2E8F0] bg-white/90 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
            <Container className="flex items-center justify-between px-0">
              <div className="flex items-center gap-3 lg:hidden">
                <Button
                  type="button"
                  variant="secondary"
                  className="!px-3 !py-2"
                  onClick={() => setMobileOpen((value) => !value)}
                >
                  {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </Button>
                <Logo className="text-sm" />
              </div>

              <div className="hidden lg:block">
                <Logo />
              </div>

              <div className="flex items-center gap-3">
                <Button variant="secondary" className="!px-3 !py-2">
                  Preview
                </Button>
              </div>
            </Container>
          </header>

          {mobileOpen ? (
            <div className="border-b border-[#E2E8F0] bg-white px-4 py-4 lg:hidden sm:px-6">
              <nav aria-label="Mobile sidebar navigation" className="space-y-2">
                {navigationItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center rounded-[14px] px-4 py-3 text-sm font-medium text-[#64748B] transition hover:bg-[#F8FAFC] hover:text-[#0F4C81]"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          ) : null}

          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <Container className="px-0">{children}</Container>
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
