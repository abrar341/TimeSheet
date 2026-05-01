import * as React from "react"

type CardBodyProps = {
    children: React.ReactNode
}

export const CardFooter = (props: CardBodyProps) => {
    const { children } = props;

    return (
        <div
            className="card-footer flex items-center justify-between gap-2 px-4 py-4">
            {children}
        </div>
    );
};