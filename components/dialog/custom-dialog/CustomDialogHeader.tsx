import { X } from "lucide-react"

type HeaderProps = {
    onHide: () => void;
    title: string
}

export const CustomDialogHeader = (props: HeaderProps) => {
    const { onHide, title } = props;
    return (
        <div
            className="flex items-center justify-between gap-2 bg-sky-50 border-b border-zinc-200 p-4">
            <h3 className="text-sm font-semibold text-zinc-900">
                {title}
            </h3>
            <button
                type="button"
                onClick={onHide}
                className="inline-flex size-8 items-center justify-center rounded-full text-zinc-700 transition-colors hover:bg-sky-100 hover:text-sky-800"
                aria-label="Close"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};