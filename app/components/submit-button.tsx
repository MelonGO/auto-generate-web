import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
    const isDisabled = rest['aria-disabled'];

    return (
        <button
            {...rest}
            className={clsx(
                'aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
                className,
            )}
        >
            {isDisabled && (
                <span className="loading loading-spinner"></span>
            )}
            <span style={{ display: isDisabled ? 'none' : 'block' }}>
                {children}
            </span>
        </button>
    );
}
