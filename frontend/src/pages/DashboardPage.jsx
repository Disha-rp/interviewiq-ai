import { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import {
  StatCard,
  QuickActionCard,
  RecentInterviewCard,
  RecommendationCard,
  ResumeUploadSection,
} from '../components/dashboard';
import { getProfile } from '../services/profileService';

function DashboardPage() {
  const [profile, setProfile] = useState(null);
  const [profileError, setProfileError] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      try {
        const response = await getProfile();

        if (isMounted) {
          setProfile(response?.data ?? null);
          setProfileError(false);
        }
      } catch (error) {
        if (isMounted) {
          setProfileError(true);
          setProfile(null);
        }
      } finally {
        if (isMounted) {
          setIsLoadingProfile(false);
        }
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const stats = [
    { title: 'Resume Score', value: '86%', description: 'Strong alignment with the target role.' },
    { title: 'Interviews Completed', value: '12', description: 'Ready for your next mock session.' },
    { title: 'Average Score', value: '82/100', description: 'Steady improvement over the last month.' },
    { title: 'Applications', value: '24', description: 'Active opportunities in progress.' },
  ];

  const quickActions = [
    { title: 'Upload Resume', description: 'Refresh your latest profile draft for review.', actionLabel: 'Upload' },
    { title: 'Start Interview', description: 'Begin a new practice interview session.', actionLabel: 'Start' },
    { title: 'View Reports', description: 'Inspect your latest feedback summaries.', actionLabel: 'Open' },
  ];

  const recentInterviews = [
    {
      title: 'Product Design Manager',
      company: 'Northstar Labs',
      status: 'Scheduled',
      time: 'Tomorrow • 10:00 AM',
      description: 'A concise prep review is recommended before the session.',
      badgeVariant: 'primary',
    },
    {
      title: 'Senior Frontend Engineer',
      company: 'Apex Studios',
      status: 'Completed',
      time: 'Yesterday • 4:30 PM',
      description: 'Feedback highlighted stronger system design explanation.',
      badgeVariant: 'success',
    },
  ];

  const recommendations = [
    {
      title: 'Sharpen your storytelling',
      description: 'Add one measurable achievement to your summary for stronger impact.',
      actionLabel: 'Review',
    },
    {
      title: 'Prepare a clearer closing',
      description: 'Your final answer structure can be more decisive and concise.',
      actionLabel: 'Review',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <section className="rounded-[24px] border border-[#E2E8F0] bg-white p-8 shadow-[0_8px_30px_rgba(15,76,129,0.06)]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#3B82F6]">
            Dashboard overview
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-[#0F172A]">
            {isLoadingProfile ? 'Loading...' : profileError ? 'Unable to load profile.' : `Welcome back, ${profile?.full_name || 'there'}`}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#64748B]">
            A premium workspace for tracking your interview readiness and next best actions.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
  <ResumeUploadSection />

  <QuickActionCard
    title="Start Interview"
    description="Begin a new practice interview session."
    actionLabel="Start"
  />

  <QuickActionCard
    title="View Reports"
    description="Inspect your latest feedback summaries."
    actionLabel="Open"
  />
</section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#0F172A]">Recent Interviews</h2>
            {recentInterviews.map((interview) => (
              <RecentInterviewCard key={interview.title} {...interview} />
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#0F172A]">AI Recommendations</h2>
            {recommendations.map((recommendation) => (
              <RecommendationCard key={recommendation.title} {...recommendation} />
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;