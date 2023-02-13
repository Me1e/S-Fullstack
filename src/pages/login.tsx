import { NextPage } from 'next';
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import Router from 'next/router';

const DashboardProtected: NextPage = (): JSX.Element => {
  const { status, data: user } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') Router.replace('/signin');
  }, [status]);

  if (status === 'authenticated') {
    console.log(user);

    return (
      <div>
        This page is protected for special people.
        <button onClick={() => signOut()}>signout</button>
      </div>
    );
  }
  return <h1>loading</h1>;
};
export default DashboardProtected;
