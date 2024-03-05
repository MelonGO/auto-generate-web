'use client';

import { Section } from "@prisma/client"
import { updatePrompt, deleteSection, updateContent } from '@/app/lib/actions'
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/app/components/submit-button';
import clsx from 'clsx';
import { IconCheck } from "@/app/components/icons";
import toast from "react-hot-toast";
import { useEffect } from 'react';

export function SectionEdit({
    section,
}: {
    section: Section;
}) {
    const initialState_1 = { message: null, errors: {} };
    const updateSectionPrompt = updatePrompt.bind(null, section.id, section.generate);
    const [state_prompt, dispatch_prompt] = useFormState(updateSectionPrompt, initialState_1);

    const initialState_2 = { message: null, errors: {} };
    const updateSectionContent = updateContent.bind(null, section.id);
    const [state_content, dispatch_content] = useFormState(updateSectionContent, initialState_2);

    useEffect(() => {
        if (state_prompt?.message) {
            if (state_prompt?.message === 'success') {
                toast.success('Prompt updated successfully');
            } else {
                toast.error(state_prompt?.message);
            }

        }
    }, [state_prompt]);

    useEffect(() => {
        if (state_content?.message) {
            if (state_content?.message === 'success') {
                toast.success('Content updated successfully');
            } else {
                toast.error(state_content?.message);
            }
        }
    }, [state_content]);

    return (
        <div className="my-5 p-4 md:p-6 shadow-md">
            <div className="flex justify-end gap-4 pb-2">
                {section.updatedAt.toUTCString()}
            </div>

            <div className="rounded-md">
                {/* Prompt */}
                <div className="mb-4">
                    <form action={dispatch_prompt}>
                        <label htmlFor="prompt" className="mb-2 block text-sm font-medium">
                            Prompt
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <textarea
                                    id="prompt"
                                    name="prompt"
                                    className="textarea textarea-bordered w-full"
                                    placeholder="Enter the promt"
                                    defaultValue={section.prompt}
                                    aria-describedby="prompt-error"
                                >
                                </textarea>
                            </div>
                        </div>
                        <div id="prompt-error" aria-live="polite" aria-atomic="true">
                            {state_prompt?.errors?.prompt &&
                                state_prompt.errors.prompt.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                        {/* {state_prompt?.message && (
                            <div aria-live="polite" aria-atomic="true">
                                <p className="m-2 text-sm text-red-500">
                                    {state_prompt.message}
                                </p>
                            </div>
                        )} */}
                        <RequireGenerateButton id={section.id} isRequired={section.generate} />
                    </form>
                </div>

                {/* Content */}
                <div className="mb-4">
                    <form action={dispatch_content}>
                        <label htmlFor="content" className="mb-2 block text-sm font-medium">
                            Content
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <textarea
                                    id="content"
                                    name="content"
                                    className="textarea textarea-bordered w-full h-64"
                                    placeholder="Enter the content"
                                    defaultValue={section.content == null ? "" : section.content}
                                    aria-describedby="content-error"
                                >
                                </textarea>
                            </div>
                            <div id="content-error" aria-live="polite" aria-atomic="true">
                                {state_content?.errors?.content &&
                                    state_content.errors.content.map((error: string) => (
                                        <p className="mt-2 text-sm text-red-500" key={error}>
                                            {error}
                                        </p>
                                    ))}
                            </div>
                        </div>
                        {/* {state_content?.message && (
                            <div aria-live="polite" aria-atomic="true">
                                <p className="m-2 text-sm text-red-500">
                                    {state_content.message}
                                </p>
                            </div>
                        )} */}
                        <SaveContentButton />
                    </form>

                </div>
            </div>

            <div className="flex justify-end mt-5">
                <SectionDelete id={section.id} />
            </div>
        </div>

    );
}

function SaveContentButton() {
    const { pending } = useFormStatus();

    return (
        <Button className="btn btn-neutral btn-block btn-outline" aria-disabled={pending}>
            Save content
        </Button>
    );
}

function RequireGenerateButton({
    id,
    isRequired,
}: {
    id: number,
    isRequired: boolean,
}) {
    const { pending } = useFormStatus();

    return (
        <Button
            className={clsx('btn btn-block my-2', !isRequired && 'btn-neutral')}
            aria-disabled={pending}
        >
            {!isRequired && (<div>Save & Require generate</div>)}

            {isRequired && (
                <div className="flex items-center">
                    <IconCheck className="size-6" />
                    <span className="ml-2">Required</span>
                </div>
            )}
        </Button>
    );
}

function SectionDelete({ id }: { id: number }) {
    const { pending } = useFormStatus();

    const initialState = { message: null };
    const deleteSectionWithId = deleteSection.bind(null, id);
    const [state, dispatch] = useFormState(deleteSectionWithId, initialState);

    useEffect(() => {
        if (state?.message) {
            toast.error(state?.message);
        }
    }, [state]);

    return (
        <form action={dispatch}>
            <Button className="btn btn-outline btn-error " aria-disabled={pending}>
                Delete Section
            </Button>
        </form>
    );
}