
import Link from 'next/link';
import { LoginForm } from '@/app/components/login-form';
import { IconHome } from '@/app/components/icons';

export default function LoginPage() {
    return (
        <main className="flex items-center justify-center h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <Link href="/">
                    <button className="btn btn-block">
                        <IconHome className='size-6' />
                    </button>
                </Link>
                <LoginForm />
            </div>
        </main>
    );
}