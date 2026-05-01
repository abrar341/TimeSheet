import * as React from "react"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

// ========== TYPES ==========
type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

type DialogOptions = {
    onHide: () => void;
    children?: React.ReactNode;
    visible: boolean;
    closeable?: boolean;
    size?: DialogSize;
    dismissableMask?: boolean;
}

// ✅ Define the expected props for dialog child sections
type CustomDialogSectionProps = {
    size?: DialogSize;
}

// ========== COMPONENT ==========
export const CustomDialog: React.FC<DialogOptions> = ({
                                                          onHide,
                                                          visible,
                                                          children,
                                                          closeable = false,
                                                          size = 'md',
                                                          dismissableMask = true,
                                                      }) => {

    const sizeClasses: Record<DialogSize, string> = {
        sm: "max-w-[384px]",
        md: "max-w-[960px]",
        lg: "max-w-[1024px]",
        xl: "max-w-[1280px]",
        full: "h-[calc(100svh-32px)] w-[calc(100vw-32px)] max-w-none rounded-none border-0",
    }

    let dialogTitle: string | undefined

    // ✅ Fix: typed cloneElement without "any"
    const enhancedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            const childTypeName = (child.type as { name?: string })?.name ?? '';

            if (childTypeName === "CustomDialogHeader") {
                const maybeTitle = (child.props as { title?: unknown })?.title
                if (typeof maybeTitle === "string") dialogTitle = maybeTitle
            }

            if (
                ['CustomDialogBody', 'CustomDialogHeader', 'CustomDialogFooter'].includes(
                    childTypeName,
                )
            ) {
                return React.cloneElement(
                    child as React.ReactElement<CustomDialogSectionProps>,
                    { size },
                );
            }
        }
        return child;
    });

    return (
        <Dialog open={visible} onOpenChange={(open) => (!open ? onHide() : undefined)}>
            <DialogContent
                showClose={closeable}
                title={dialogTitle ?? "Dialog"}
                className={cn(
                    "max-h-[calc(100svh-32px)] overflow-hidden p-0",
                    size !== "full" ? "rounded-2xl border border-zinc-200" : "",
                    sizeClasses[size]
                )}
                onPointerDownOutside={(e) => {
                    if (!dismissableMask) e.preventDefault()
                }}
                onEscapeKeyDown={(e) => {
                    if (!dismissableMask) e.preventDefault()
                }}
            >
                {enhancedChildren}
            </DialogContent>
        </Dialog>
    );
};