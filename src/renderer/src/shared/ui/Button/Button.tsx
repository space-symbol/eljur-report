import { classNames, Modes } from '@renderer/shared/lib/classNames/classNames'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import cls from './Button.module.css'

export enum ButtonTheme {
  CLEAR = 'clear',
  OUTLINE = 'outline',
  BACKGROUND = 'background',
  TRANSPARENT = 'transparent'
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ButtonTheme
  square?: boolean
  size?: ButtonSize
  disabled?: boolean
  children?: ReactNode
}

export const Button = (props: ButtonProps) => {
  const {
    className,
    children,
    theme = ButtonTheme.OUTLINE,
    square,
    disabled,
    size = ButtonSize.M,
    ...otherProps
  } = props

  const modes: Modes = {
    [cls[theme]]: true,
    [cls.square]: square,
    [cls[size]]: true
  }

  return (
    <button
      type="button"
      className={classNames(cls.Button, [className], modes)}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  )
}
