'use client';

import { deletePage } from '../lib/actions'
import { Button } from './submit-button';
import { useFormStatus, useFormState } from 'react-dom';
import toast from "react-hot-toast";
import { useEffect } from 'react';

export function PageDelete({ type, id }: { type: string, id: number }) {
    let pageType;
    switch (type) {
        case 'category':
            pageType = 'Category';
            break;

        case 'menu':
            pageType = 'Menu';
            break;

        case 'submenu':
            pageType = 'SubMenu';
            break;

        default:
            pageType = '';
            break;
    }

    const initialState = { message: null };
    const deletePageWithTypeId = deletePage.bind(null, type, id);
    const [state, dispatch] = useFormState(deletePageWithTypeId, initialState);

    useEffect(() => {
        if (state?.message) {
            toast.error(state?.message);
        }
    }, [state]);

    return (
        <form action={dispatch}>
            <DeleteButton pageType={pageType} />
        </form>
    );
}

function DeleteButton({ pageType }: { pageType: string }) {
    const { pending } = useFormStatus();

    return (
        <Button className="btn btn-warning btn-outline btn-block" aria-disabled={pending}>
            Delete the {pageType}
        </Button>
    );
}