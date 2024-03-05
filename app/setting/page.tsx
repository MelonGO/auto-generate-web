import { UpdatePasswordForm } from '@/app/components/setting-form';
import { Button } from '@/app/components/submit-button';
import Link from 'next/link'
import { signOut } from '@/auth';
import { unstable_noStore as noStore } from 'next/cache';
import { IconHome } from '@/app/components/icons';

export default async function Page() {
    noStore();

    return (
        <main className="flex h-screen">
            <div className="mx-auto flex w-full max-w-[600px] flex-col space-y-2.5 p-4">
                <Link href="/">
                    <button className="btn btn-block">
                        <IconHome className='size-6' />
                    </button>
                </Link>
                {/* <SettingForm setting={setting} /> */}
                <UpdatePasswordForm />
                <SignOutButton />
            </div>
        </main>
    );

}

function SignOutButton() {

    return (
        <form
            action={async () => {
                'use server';
                await signOut();
            }}
        >
            <Button className="btn btn-block mb-6">
                Sign Out
            </Button>
        </form>

    );
}