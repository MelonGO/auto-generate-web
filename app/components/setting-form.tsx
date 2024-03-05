'use client';

import { Button } from './submit-button';
import { useFormState, useFormStatus } from 'react-dom';
import { updatePassword } from '../lib/actions'

export function UpdatePasswordForm() {
    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(updatePassword, initialState);

    return (
        <form action={dispatch} className="space-y-3">
            <div className="flex-1 rounded-lg px-6 pb-4 pt-4 shadow-md">
                <h1>UPDATE PASSWORD</h1>
                <div className="w-full">
                    <div className="mt-2">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="oldPassword"
                        >
                            Old Password
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="oldPassword"
                                type="password"
                                name="oldPassword"
                                placeholder="Enter old password"
                                required
                                minLength={6}
                                aria-describedby="oldPassword-error"
                            />
                        </div>
                        <div id="oldPassword-error" aria-live="polite" aria-atomic="true">
                            {state?.errors?.oldPassword &&
                                state.errors.oldPassword.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                    <div className="mt-2">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="newPassword"
                        >
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="newPassword"
                                type="password"
                                name="newPassword"
                                placeholder="Enter new password"
                                required
                                minLength={6}
                                aria-describedby="newPassword-error"
                            />
                        </div>
                        <div id="newPassword-error" aria-live="polite" aria-atomic="true">
                            {state?.errors?.newPassword &&
                                state.errors.newPassword.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm new password"
                                required
                                minLength={6}
                                aria-describedby="confirmPassword-error"
                            />
                        </div>
                        <div id="confirmPassword-error" aria-live="polite" aria-atomic="true">
                            {state?.errors?.confirmPassword &&
                                state.errors.confirmPassword.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>
                {state?.message && (
                    <div id="message" aria-live="polite" aria-atomic="true">
                        <p className="mt-2 text-sm text-red-500">
                            {state.message}
                        </p>
                    </div>
                )}
                <UpdateButton />
                <div
                    className="flex h-6 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >
                </div>
            </div>
        </form>
    );
}

function UpdateButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            className="btn btn-neutral btn-block mt-4"
            aria-disabled={pending}
            aria-describedby="message"
        >
            Update
        </Button>
    );
}
