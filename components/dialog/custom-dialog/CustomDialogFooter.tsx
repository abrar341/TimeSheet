import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

type CardBodyProps = {
    children: React.ReactNode;
    className?: string;
}

export const CustomDialogFooter = (props: CardBodyProps) => {
    const { children, className } = props;

    return (
        <div
            className={twMerge(clsx(
                'flex',
                'items-center',
                'justify-between',
                'gap-2',
                'bg-gray-50',
                'border-t',
                'border-neutral-200',
                'p-4',
                'text-sm',
                className,
            ))}>
            {children}
        </div>
    );
};