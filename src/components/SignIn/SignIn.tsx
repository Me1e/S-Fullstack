import { useUserInfoStore } from '@/util/store';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { Input, SignInButton, SignInWrapper } from './SignIn.styles';
import Lottie from 'lottie-react';
import * as animationData from './animationData.json';
import { motion } from 'framer-motion';
import { API_ADDRESS } from '@/const';

const SignIn = () => {
  const router = useRouter();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { setUsername, setId } = useUserInfoStore();
  const [isClicked, setIsClicked] = useState(false);

  const signUpRequest = async () => {
    return fetch(`${API_ADDRESS}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: usernameRef.current?.value,
      }),
    }).then((res) => res.json());
  };

  const { mutate } = useMutation(signUpRequest, {
    onSuccess: (data) => {
      setId(data.id);
      setUsername(data.name);
      router.push('/explore');
    },
  });

  const singInHandler = () => {
    if (!usernameRef.current || !passwordRef.current) return;
    console.log('hi');

    setIsClicked(true);
    mutate();
  };

  return (
    <SignInWrapper>
      <Lottie animationData={animationData} loop={false} />
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.167, delay: 1.3 }}
      >
        <Input placeholder='Username' ref={usernameRef} />
        <Input placeholder='Password' type='password' ref={passwordRef} />
        <SignInButton disabled={isClicked} onClick={singInHandler}>
          Sign In
        </SignInButton>
      </motion.div>
    </SignInWrapper>
  );
};

export default SignIn;
