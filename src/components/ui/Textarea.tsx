import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[120px] w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base transition-colors',
          'placeholder:text-gray-400',
          'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
          'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-50',
          'resize-none',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
