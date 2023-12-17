import { classNames } from '@renderer/shared/lib/classNames/classNames'
import cls from './Loader.module.css'

interface LoaderProps {
  className?: string
  labelClassName?: string
  label?: string
}

export const Loader = ({ className, labelClassName, label }: LoaderProps) => {
  return (
    <div className={cls.wrapper}>
      <span className={classNames(cls.Loader, [className], {})} />
      {label && <span className={classNames(cls.loaderLabel, [labelClassName])}>{label}</span>}
    </div>
  )
}
