import { Logo } from '@/assets';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import LoginForm from '@/components/Form/loginForm';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import SessionWrapper from '@/hooks/UseSessionWrapper';

export default function Login() {
  return (
    <SessionWrapper>
      <Card className="w-full bg-white dark:bg-gray-800">
        <ThemeToggle />
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Image src={Logo} alt="Logo" />
          </div>
          <CardTitle className="text-2xl text-gray-900 dark:text-white">Login</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Digite suas Credenciais abaixo para fazer login em sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <LoginForm />
        </CardContent>
      </Card>
    </SessionWrapper>
  );
}