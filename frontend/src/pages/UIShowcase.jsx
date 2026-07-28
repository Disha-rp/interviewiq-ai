import { Button, Input, Card, Badge } from '../components/ui';

function UIShowcase() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] px-6 py-12 text-[#0F172A]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#3B82F6]">
            UI Foundation Showcase
          </p>
          <h1 className="text-3xl font-bold text-[#0F172A] sm:text-4xl">
            Reusable component review
          </h1>
          <p className="max-w-2xl text-base text-[#64748B]">
            This temporary page is only for reviewing the shared design-system primitives.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card title="Buttons" subtitle="Different visual treatments for primary actions and secondary actions.">
            <div className="flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="success">Success</Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
            </div>
          </Card>

          <Card title="Inputs" subtitle="Basic field styles with helper and error patterns.">
            <div className="space-y-4">
              <Input label="Email" placeholder="name@example.com" />
              <Input label="Password" type="password" placeholder="Enter password" helperText="Use at least 8 characters" />
              <Input label="Error state" placeholder="Invalid input" error="This field is required" />
            </div>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card title="Badges" subtitle="Compact status and category labels.">
            <div className="flex flex-wrap gap-3">
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
            </div>
          </Card>

          <Card
            title="Sample card"
            subtitle="A simple surface for content and supporting actions."
            footer={
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary">Cancel</Button>
                <Button>Continue</Button>
              </div>
            }
          >
            <p className="text-sm leading-6 text-[#64748B]">
              This card demonstrates the shared spacing, border radius, and content structure used throughout the design system.
            </p>
          </Card>
        </section>
      </div>
    </div>
  );
}

export default UIShowcase;
