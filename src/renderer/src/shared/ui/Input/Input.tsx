import React, { ChangeEvent, InputHTMLAttributes } from 'react'
import { Button } from '@renderer/shared/ui/Button/Button'
import { classNames, Modes } from '@renderer/shared/lib/classNames/classNames'
import cls from './Input.module.css'

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'onKeyDown'
>

interface InputProps extends HTMLInputProps {
  className?: string
  wrapperClassName?: string
  value?: string | number
  readOnly?: boolean
  onChange?: (value: string) => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  onIconClick?: () => void
  type?: string
  LeftIcon?: SVG
  RightIcon?: SVG
  filepath?: string
  buttonText?: string
}

export const Input = (props: InputProps) => {
  const {
    className,
    value,
    onChange,
    onKeyDown,
    onIconClick,
    readOnly,
    LeftIcon,
    RightIcon,
    type,
    buttonText,
    filepath,
    ...otherProps
  } = props

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value)
  }
  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event)
  }

  const onIconClickHandler = () => {
    !readOnly && onIconClick?.()
  }

  const modes: Modes = {
    [cls.with_icon]: Boolean(LeftIcon || RightIcon),
    [cls.readOnly]: readOnly
  }

  const renderInput = () => {
    const Icon = LeftIcon || RightIcon
    return (
      <>
        {Icon && (
          <Button onClick={onIconClickHandler}>
            <Icon className={cls.icon} />
          </Button>
        )}
        <input
          type={type}
          className={cls.input}
          value={value}
          onKeyDown={onKeyDownHandler}
          onChange={onChangeHandler}
          {...otherProps}
        />
      </>
    )
  }

  return <div className={classNames(cls.Wrapper, [className], modes)}>{renderInput()}</div>
}
