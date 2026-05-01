import * as React from "react"
import { clsx } from "clsx"

type CardBodyProps = {
    children: React.ReactNode;
    className?: string;
    isLoading?: boolean;
};

export const CardBody = (props: CardBodyProps) => {
    const { children, className, isLoading } = props;

    if (isLoading)
        return (
            <div className={clsx("p-4", className)}>
                <div className="h-[300px] w-full animate-pulse rounded-xl bg-zinc-100" />
            </div>
        )

    return <div className={clsx("card-body px-4 py-4", className)}>{children}</div>
};
