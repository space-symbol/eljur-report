import { classNames } from '@renderer/shared/lib/classNames/classNames'
import cls from './AppForm.module.css'
import { InputHTMLAttributes, ReactNode } from 'react'

interface AppForm extends InputHTMLAttributes<HTMLFormElement> {
  className?: string
  children?: ReactNode
}

export const AppForm = (props: AppForm) => {
  const { className, children, ...otherProps } = props

  return (
    <form className={classNames(cls.AppForm, [className], {})} {...otherProps}>
      {children}
    </form>
  )
}
