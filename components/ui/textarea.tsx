import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className,  ...props}: React.ComponentProps<"textarea">) {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm transition-colors",
          "placeholder:text-gray-400",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "hover:border-gray-300",
          "resize-none",
          className
        )}
        {...props}
      />
    )
}

export { Textarea }