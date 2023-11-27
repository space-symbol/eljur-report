import { ChangeEvent } from 'react'
import { classNames, Modes } from '@renderer/shared/lib/classNames/classNames'
import cls from './Select.module.css'

export interface SelectOption<T = string> {
  value: T
  content: T
}

interface SelectProps {
  className?: string
  label?: string
  options?: SelectOption[]
  onChange?: (value: string) => void
  readOnly?: boolean
  selectedItems?: string[]
}

export const Select = (props: SelectProps) => {
  const { className, label, options, onChange, readOnly } = props

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value)
    }
  }

  const optionsList = () =>
    options?.map((opt) => (
      <option className={cls.option} value={opt.value} key={opt.value}>
        {opt.content}
      </option>
    ))

  const modes: Modes = {}

  return (
    <div className={classNames(cls.Wrapper, [className], modes)}>
      {label && <span className={cls.label}>{`${label}`}</span>}
      <select disabled={readOnly} className={cls.select} onChange={onChangeHandler}>
        {optionsList()}
      </select>
    </div>
  )
}
