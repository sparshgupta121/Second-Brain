import { ReactElement } from "react";

type Variants = "primary" | "secondary" | "full-width";
export type Sizes = "sm" | "md" | "lg";

interface ButtonProps {
    variant: Variants;
    size: Sizes;
    title?: string;
    startIcon?: ReactElement;
    onClick?: () => void;
    loading?: boolean;
}

const variantStyles: Record<Variants, string> = {
    "primary": "bg-customPurple-600 text-white",
    "secondary": "bg-customPurple-400 text-customPurple-600",
    "full-width": "bg-customPurple-500 text-white hover:bg-customPurple-600 transition-colors duration-150 w-full"
}

const sizeStyles: Record<Sizes, string> = {
    "sm": "py-1 pl-2 pr-3",
    "md": "py-2 pl-3 pr-4",
    "lg": "py-3 pl-5 pr-6"
}

const defaultStyles = "rounded-lg flex items-center justify-center font-light"

export const Button = (props: ButtonProps) => {
    return <button onClick={props.onClick} className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]} ${props.loading ? "opacity-45": ""}`}>
        {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null} {props.title}
    </button>
}