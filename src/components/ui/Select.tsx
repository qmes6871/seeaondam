import { forwardRef, type SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean
  options: { value: string; label: string }[]
  placeholder?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, options, placeholder, ...props }, ref) => {
    return (
      <select
        className={cn(
          'flex h-12 w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 text-base transition-colors',
          'text-gray-900',
          'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
          'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-50',
          'bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 24 24%27 stroke=%27%236b7280%27%3E%3Cpath stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27M19 9l-7 7-7-7%27/%3E%3C/svg%3E")] bg-[length:20px] bg-[right_12px_center] bg-no-repeat pr-10',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
          className
        )}
        ref={ref}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    )
  }
)
Select.displayName = 'Select'

export { Select }
