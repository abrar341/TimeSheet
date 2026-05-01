import type { ReactElement } from "react"
import * as React from "react"
import { twMerge } from "tailwind-merge"

type DialogOptions = {
    children?: React.ReactNode;
    styleClass?: string;
    className?: string;
    isLoading?: boolean;
};

export const Card = (props: DialogOptions) => {
    const { children, styleClass, className, isLoading = false } = props;

    const enhancedChildren = React.Children.map(children, (child: React.ReactNode) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child as ReactElement<any>, { isLoading });
        }
        return child;
    });

    return (
        <div
            className={twMerge(
                "card grid grid-rows-[auto_1fr_auto] w-full rounded-lg border border-zinc-100 bg-white shadow-[0_1px_18px_rgba(0,0,0,0.04)]",
                styleClass,
                className
            )}
        >
            {enhancedChildren}
        </div>
    );
};