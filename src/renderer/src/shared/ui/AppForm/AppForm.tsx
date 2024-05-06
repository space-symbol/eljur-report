import { classNames } from '@renderer/shared/lib/classNames/classNames'
import cls from './AppForm.module.css'
import { InputHTMLAttributes, ReactNode } from 'react'

interface AppForm extends InputHTMLAttributes<HTMLFormElement> {
  className?: string
  children?: ReactNode
  error?: string
  successMessage?: string
}

export const AppForm = (props: AppForm) => {
  const { className, children, error, successMessage, ...otherProps } = props

  return (
    <form className={classNames(cls.AppForm, [className], { [cls.error]: error })} {...otherProps}>
      {children}
      {error && !successMessage && <span className={cls.errorText}>{error}</span>}
      {successMessage && <span className={cls.messageText}>{successMessage}</span>}

    </form>
  )
}
