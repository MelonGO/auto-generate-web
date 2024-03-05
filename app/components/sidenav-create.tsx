'use client';

import { createSideNav } from '@/app/lib/actions'
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/app/components/submit-button';
import { useEffect } from 'react';
import toast from "react-hot-toast";

export function SideNavCreate({
    type,
    id,
}: {
    type: string,
    id: number,
}) {
    const initialState = { message: null, errors: {} };
    const create = createSideNav.bind(null, type, id);
    const [state, dispatch] = useFormState(create, initialState);

    useEffect(() => {
        if (state?.message) {
            toast.error(state?.message);
        }
    }, [state]);

    return (
        <form action={dispatch}>
            <div className="rounded-md p-4">
                {/* SideNav Name */}
                <div className="mb-4">
                    {/* <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        SideNav Name
                    </label> */}
                    <div className="relative">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter the side navigation name"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                            aria-describedby="name-error"
                            required
                        />
                    </div>
                    <div id="name-error" aria-live="polite" aria-atomic="true">
                        {state?.errors?.name &&
                            state.errors.name.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>

                {/* SideNav Link */}
                <div className="mb-4">
                    {/* <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                        SideNav Link
                    </label> */}
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="link"
                                name="link"
                                type="text"
                                placeholder="Enter the side navigation link"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="link-error"
                                required
                            />
                        </div>
                        <div id="link-error" aria-live="polite" aria-atomic="true">
                            {state?.errors?.link &&
                                state.errors.link.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-4">
                <CreateButton />
            </div>
        </form>
    );
}

function CreateButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            className="btn btn-neutral btn-block"
            aria-describedby="message-error"
            aria-disabled={pending}
        >
            Create
        </Button>
    );
}