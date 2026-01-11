import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-button hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-emergency hover:bg-destructive/90",
        outline:
          "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-soft hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        emergency:
          "gradient-emergency text-white shadow-emergency hover:opacity-90 animate-pulse-soft",
        safe:
          "gradient-safe text-white shadow-button hover:opacity-90",
        calm:
          "gradient-calm text-white shadow-button hover:opacity-90",
        warm:
          "gradient-warm text-white shadow-soft hover:opacity-90",
        medical:
          "bg-medical text-medical-foreground shadow-soft hover:bg-medical/90",
        warning:
          "bg-warning text-warning-foreground shadow-soft hover:bg-warning/90",
        quiet:
          "bg-muted text-muted-foreground border-2 border-transparent hover:border-primary/20",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-md px-4 text-xs",
        lg: "h-14 rounded-xl px-8 text-base",
        xl: "h-16 rounded-2xl px-10 text-lg",
        icon: "h-12 w-12",
        "icon-lg": "h-16 w-16 rounded-2xl",
        emergency: "h-20 w-full rounded-2xl text-lg font-bold",
        tile: "h-28 w-full rounded-2xl flex-col gap-2 text-base font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
