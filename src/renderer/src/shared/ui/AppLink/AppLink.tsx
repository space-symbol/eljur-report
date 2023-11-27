import { classNames } from '@renderer/shared/lib/classNames/classNames'
import { Link, LinkProps } from 'react-router-dom'
import { ReactNode } from 'react'
import cls from './AppLink.module.css'

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  RED = 'red'
}

interface AppLinkProps extends LinkProps {
  className?: string
  theme?: AppLinkTheme
  children?: ReactNode
}

export const AppLink = (props: AppLinkProps) => {
  const { to, className, children, theme = AppLinkTheme.PRIMARY, ...otherProps } = props

  return (
    <Link
      to={to}
      className={classNames(cls.AppLink, [className], { [cls[theme]]: true })}
      {...otherProps}
    >
      {children}
    </Link>
  )
}
