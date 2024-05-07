import React, { ChangeEvent, InputHTMLAttributes, forwardRef } from 'react'
import { Button } from '@renderer/shared/ui/Button/Button'
import { classNames, Modes } from '@renderer/shared/lib/classNames/classNames'
import cls from './Input.module.css'

type HTMLInputProps = InputHTMLAttributes<HTMLInputElement>

interface InputProps extends HTMLInputProps {
  className?: string
  wrapperClassName?: string
  value?: string | number
  readOnly?: boolean
  onIconClick?: () => void
  type?: string
  label?: string
  required?: boolean
  LeftIcon?: SVG
  RightIcon?: SVG
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
  const {
    className,
    value,
    onChange,
    onBlur,
    onKeyDown,
    onIconClick,
    readOnly,
    label,
    required,
    LeftIcon,
    RightIcon,
    type,
    error,
    ...otherProps
  } = props

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event)
  }
  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event)
  }
  const onBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(event)
  }
  const onIconClickHandler = () => {
    !readOnly && onIconClick?.()
  }

  const modes: Modes = {
    [cls.readOnly]: readOnly
  }

  const renderInput = () => {
    const Icon = LeftIcon || RightIcon
    return (
      <div className={cls.wrapper}>
        {label && (
          <span className={cls.inputLabel}>
            {label}
            {required && <span className={cls.required}>*</span>}
          </span>
        )}
        <div className={cls.inputWrapper}>
          <input
            ref={ref}
            type={type}
            className={classNames(cls.input, [], {
              [cls.withIcon]: Boolean(LeftIcon || RightIcon)
            })}
            value={value}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            onKeyDown={onKeyDownHandler}
            required={required}
            readOnly={readOnly}
            {...otherProps}
          />
          {error && <span className={cls.error}>{error}</span>}
          {Icon && (
            <Button
              disabled={readOnly}
              className={classNames(cls.iconButton, [LeftIcon ? cls.left : cls.right])}
              onClick={onIconClickHandler}
            >
              <Icon className={cls.icon} />
            </Button>
          )}
        </div>
      </div>
    )
  }

  return <div className={classNames(cls.Container, [className], modes)}>{renderInput()}</div>
})

  Input.displayName = 'Input'

