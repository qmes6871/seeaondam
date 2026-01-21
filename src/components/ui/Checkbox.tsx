import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: boolean
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id={id}
          className={cn(
            'mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-2 border-gray-300',
            'checked:border-primary-600 checked:bg-primary-600',
            'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500',
            className
          )}
          ref={ref}
          {...props}
        />
        {label && (
          <label
            htmlFor={id}
            className={cn(
              'cursor-pointer text-sm text-gray-600 leading-relaxed',
              error && 'text-red-600'
            )}
          >
            {label}
          </label>
        )}
      </div>
    )
  }
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }
