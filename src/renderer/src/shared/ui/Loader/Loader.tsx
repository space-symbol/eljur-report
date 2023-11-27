import { classNames } from '@renderer/shared/lib/classNames/classNames'
import cls from './Loader.module.css'

interface LoaderProps {
  className?: string
}

export const Loader = ({ className }: LoaderProps) => {
  return (
    <div className={cls.wrapper}>
      <span className={classNames(cls.Loader, [className], {})} />
    </div>
  )
}
