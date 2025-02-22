'use client'

import { FormEvent, KeyboardEvent, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader } from 'lucide-react';
import { useSignupConfirmation } from '../hooks/useSignupConfirmation';

const SignupConfirmationCard = () => {
  const {mutate, isPending} = useSignupConfirmation();
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 4) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      const otpValue = otp.join('');
      mutate({code: otpValue});
      
      // Reset form after successful submission
      setOtp(['', '', '', '', '']);
    } catch (error) {
      console.error('Error submitting OTP:', error);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Confirmation Code
        </CardTitle>
        <CardDescription className="text-center">
          Please enter the verification code sent to your email
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2 justify-center">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={inputRefs[index]}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className=" h-12 text-center text-lg"
                disabled={isPending}
              />
            ))}
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isPending || otp.some(digit => !digit)}
          >
            {isPending ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify Confirmation Code'
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-between gap-2">
        <Button 
          variant="link" 
          className="p-0" 
          onClick={() => router.push("/signin")}
          disabled={isPending}
        >
          Back to Sign in
        </Button>
        <Button
          variant="link"
          className="p-0"
          onClick={() => setOtp(['', '', '', '', ''])}
          disabled={isPending}
        >
          Clear
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignupConfirmationCard;