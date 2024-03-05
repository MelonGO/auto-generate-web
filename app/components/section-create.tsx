'use client';

import { createSection } from '@/app/lib/actions'
import { Button } from '@/app/components/submit-button';
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import toast from "react-hot-toast";

export function SectionCreate({ type, id }: { type: string, id: number }) {
    const initialState = { message: null };
    const create = createSection.bind(null, type, id);
    const [state, dispatch] = useFormState(create, initialState);

    useEffect(() => {
        if (state?.message) {
            toast.error(state?.message);
        }
    }, [state]);

    return (
        <div className="my-10">
            <form action={dispatch}>
                <CreateButton />
            </form>
        </div>

    );
}

function CreateButton() {
    const { pending } = useFormStatus();

    return (
        <Button className="btn btn-neutral btn-outline btn-block" aria-disabled={pending}>
            Create Section
        </Button>
    );
}