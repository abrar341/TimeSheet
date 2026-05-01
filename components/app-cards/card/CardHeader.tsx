import React from "react"
import { twMerge } from "tailwind-merge"

type cardTitleProps = {
    title?: string;
    isLoading?: boolean;
    className?: string;
}

const CardTitle: React.FC<cardTitleProps> = ({ title, isLoading, className }) => {

    if (isLoading) return (
        <h3 className={twMerge("text-[18px] font-semibold text-zinc-900", className)}>
            <span className="block h-[18px] w-[120px] animate-pulse rounded-md bg-zinc-100" />
        </h3>
    );

    if (!title) return <></>;

    return (
        <h3 className={twMerge("text-[18px] font-semibold text-zinc-900", className)}>
            {title}
        </h3>
    );
};

type HeaderProps = {
    title?: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
    isLoading?: boolean;
    className?: string;
    titleClassName?: string;
}

export const CardHeader = (props: HeaderProps) => {
    const { title, children, icon, isLoading, className = '', titleClassName } = props;

    if (isLoading) return (
        <div
            className={twMerge("card-header flex items-center justify-between gap-2 px-4 py-4", className)}>
            <div className="flex gap-2 items-center">
                <span className="block size-4 animate-pulse rounded-full bg-zinc-100" />
                <CardTitle title={title} className={titleClassName} />
            </div>
            {children}
        </div>
    );

    return (
        <div
            className={twMerge("card-header flex items-center justify-between gap-2 px-4 py-4", className)}>
            {title && icon ? (
                <div className="flex gap-2">
                    <span className="block size-4 [&_svg]:size-4">{icon}</span>
                    <CardTitle title={title} className={titleClassName} />
                </div>
            ) : title ? (
                <CardTitle title={title} className={titleClassName} />
            ) : null}
            {children}
        </div>
    );
};