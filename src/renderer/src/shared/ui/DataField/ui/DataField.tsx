import { Modes, classNames } from '@renderer/shared/lib/classNames/classNames'
import cls from './DataField.module.css'
import { Button, ButtonTheme } from '@renderer/shared/ui/Button/Button'
interface DataFieldProps {
  className?: string
  fieldValue: string
  Icon?: SVG
  label?: string
  onIconClick?: () => void
}

export const DataField = (props: DataFieldProps) => {
  const { className, fieldValue, Icon, label, onIconClick } = props

  const onClickHandler = () => {
    onIconClick?.()
  }

  const modes: Modes = {
    [cls.withIcon]: !!Icon
  }
  return (
    <div className={cls.DataField}>
      {label && <span className={cls.label}>{label}</span>}
      <div className={classNames(cls.dataContainer, [className], modes)}>
        <span tabIndex={1} className={cls.value}>
          {fieldValue}
        </span>
        {Icon && (
          <Button
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                onClickHandler()
              }
            }}
            tabIndex={2}
            className={cls.iconButton}
            theme={ButtonTheme.CLEAR}
          >
            <Icon onClick={onClickHandler} className={cls.icon} />
          </Button>
        )}
      </div>
    </div>
  )
}
