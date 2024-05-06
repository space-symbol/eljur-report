import { DatabasePropertiesForm } from '../Form/DatabasePropertiesForm'
import cls from './DatabasePropertiesDialog.module.css'
import { classNames } from '@renderer/shared/lib/classNames/classNames'

interface DatabasePropertiesDialogProps {
  className?: string
  isOpen?: boolean
  onSubmitSuccess?: () => void
  onClose?: () => void
  defaultValues?: DatabaseProperties
}
export const DatabasePropertiesDialog = (props: DatabasePropertiesDialogProps) => {
  const { className, isOpen, onSubmitSuccess, onClose, defaultValues } = props
  return (
    isOpen && (
      <>
        <div className={classNames(cls.dialog, [className])}>
          <DatabasePropertiesForm
            defaultValues={defaultValues}
            onSubmitSuccess={onSubmitSuccess}
            className={cls.form}
          />
        </div>
        <div className={cls.backddrop} onClick={onClose}></div>
      </>
    )
  )
}
