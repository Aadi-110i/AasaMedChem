import { getAuth } from '@/lib/auth';
import LandingClient from '@/components/LandingClient';

export default async function LandingPage() {
  const auth = await getAuth();
  return <LandingClient auth={auth} />;
}
