import { useState, forwardRef } from 'react'
import { cn } from '../../utils/cn'
import { Button } from '../Button'
import { Input } from '../Input'
import { Select } from '../Select'
import { Checkbox } from '../Checkbox'

export const Filter = forwardRef(({
  filters = [],
  onFilterChange,
  onApply,
  onReset,
  className,
  ...props
}, ref) => {
  const [filterValues, setFilterValues] = useState({})

  const handleFilterChange = (filterId, value) => {
    const newValues = { ...filterValues, [filterId]: value }
    setFilterValues(newValues)
    onFilterChange?.(newValues)
  }

  const handleApply = () => {
    onApply?.(filterValues)
  }

  const handleReset = () => {
    setFilterValues({})
    onReset?.()
  }

  return (
    <div className={cn('bg-white p-4 rounded-lg border border-zinc-950/10 dark:bg-zinc-900 dark:border-white/10', className)} ref={ref} {...props}>
      <div className="space-y-4">
        {filters.map((filter) => (
          <FilterField
            key={filter.id}
            filter={filter}
            value={filterValues[filter.id]}
            onChange={(value) => handleFilterChange(filter.id, value)}
          />
        ))}
      </div>

      {(onApply || onReset) && (
        <div className="flex justify-end space-x-2 mt-6 pt-4 border-t border-zinc-950/10 dark:border-white/10">
          {onReset && (
            <Button variant="ghost" size="sm" onClick={handleReset}>
              重置
            </Button>
          )}
          {onApply && (
            <Button variant="primary" size="sm" onClick={handleApply}>
              应用筛选
            </Button>
          )}
        </div>
      )}
    </div>
  )
})

Filter.displayName = 'Filter'

function FilterField({ filter, value, onChange }) {
  const { type, label, placeholder, options, ...rest } = filter

  const renderField = () => {
    switch (type) {
      case 'text':
        return (
          <Input
            placeholder={placeholder}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            {...rest}
          />
        )

      case 'select':
        return (
          <Select
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            {...rest}
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        )

      case 'multiSelect':
        return (
          <div className="space-y-2">
            {options?.map((option) => (
              <Checkbox
                key={option.value}
                id={`${filter.id}-${option.value}`}
                label={option.label}
                checked={value?.includes?.(option.value) || false}
                onChange={(e) => {
                  const currentValues = value || []
                  const newValues = e.target.checked
                    ? [...currentValues, option.value]
                    : currentValues.filter(v => v !== option.value)
                  onChange(newValues)
                }}
                {...rest}
              />
            ))}
          </div>
        )

      case 'dateRange':
        return (
          <div className="flex space-x-2">
            <Input
              type="date"
              placeholder="开始日期"
              value={value?.start || ''}
              onChange={(e) => onChange({ ...value, start: e.target.value })}
            />
            <Input
              type="date"
              placeholder="结束日期"
              value={value?.end || ''}
              onChange={(e) => onChange({ ...value, end: e.target.value })}
            />
          </div>
        )

      case 'range':
        return (
          <div className="space-y-2">
            <input
              type="range"
              min={rest.min || 0}
              max={rest.max || 100}
              value={value || rest.min || 0}
              onChange={(e) => onChange(parseInt(e.target.value))}
              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer dark:bg-zinc-700"
            />
            <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
              <span>{rest.min || 0}</span>
              <span className="font-medium">{value || rest.min || 0}</span>
              <span>{rest.max || 100}</span>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-zinc-950 mb-2 dark:text-white">
          {label}
        </label>
      )}
      {renderField()}
    </div>
  )
}