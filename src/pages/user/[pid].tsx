import { BottomTabsNavigator } from '@/components/@Common/BottomTabsNavigator';
import User from '@/components/User';
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <>
      <User username={pid as string} />
      <BottomTabsNavigator />
    </>
  );
}
