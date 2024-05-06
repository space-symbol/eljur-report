import { useSelector } from 'react-redux/es/hooks/useSelector'
import cls from './FetchDataForm.module.css'
import { getGroupsList, getGroupSelectedGroupsList, GroupSelect } from '@renderer/entities/Group'
import { classNames } from '@renderer/shared/lib/classNames/classNames'
import { Button, ButtonTheme } from '@renderer/shared/ui/Button/Button'
import { useAppDispatch } from '@renderer/shared/hooks/useAppDispatch/useAppDispatch'
import { fetchData } from '../models/services/fetchData/fetchData'
import { Loader } from '@renderer/shared/ui/Loader/Loader'
import {
  getFetchDataFormPercentage,
  getFetchDataFormDatabaseProperties,
  getFetchDataFormIsFetching,
  getFetchDataFormDone,
  getFetchDataFormData
} from '../models/selectors/fetchDataSelectors'
import { DateIntervalInput } from '@renderer/entities/DateInterval'
import {
  getDateIntervalFromDateValue,
  getDateIntervalToDateValue
} from '@renderer/entities/DateInterval'
import { getDateIntervalIsValid } from '@renderer/entities/DateInterval'
import { memo, useState } from 'react'
import { getGroupIsValid } from '@renderer/entities/Group'
import { fetchDataFormActions } from '../models/slice/fetchDataFormSlice'
import { AppForm } from '@renderer/shared/ui/AppForm/AppForm'
import { createPortal } from 'react-dom'
import { SaveInto } from '../models/types/fetchDataFormSchema'
import { DatabasePropertiesDialog } from '@renderer/widgets/DatabasePropertiesDialog'
import { saveData } from '../models/services/saveData'


interface FetchDataFormProps {
  className?: string
}

export const FetchDataForm = memo((props: FetchDataFormProps) => {
  const { className } = props

  const dispatch = useAppDispatch()
  const selectedGroups = useSelector(getGroupSelectedGroupsList)
  const groupsList = useSelector(getGroupsList)
  const fromDateValue = useSelector(getDateIntervalFromDateValue)
  const toDateValue = useSelector(getDateIntervalToDateValue)
  const isFetching = useSelector(getFetchDataFormIsFetching)
  const groupSelectIsValid = useSelector(getGroupIsValid)
  const dateIntervalIsValid = useSelector(getDateIntervalIsValid)
  const groupInProcess = useSelector(getFetchDataFormPercentage)
  const databaseProperties = useSelector(getFetchDataFormDatabaseProperties)
  const isDone = useSelector(getFetchDataFormDone)
  const isReady = dateIntervalIsValid && groupSelectIsValid && !isFetching
  const response = useSelector(getFetchDataFormData)
  const [isDatabaseDialogOpen, setDatabaseDialogOpen] = useState(false)

  const onMySQLFormatClick = () => {
    dispatch(fetchDataFormActions.setSaveInto(SaveInto.mysql))
  }

  const onJsonFormatClick = () => {
    dispatch(fetchDataFormActions.setSaveInto(SaveInto.json))
  }
  const appContent = document.querySelector('.app')!
  return (
    <>
      <AppForm
        successMessage={isDone ? 'Данные успешно сохранены' : undefined}
        onSubmit={(event) => {
          event.preventDefault()
          dispatch(fetchDataFormActions.setDone(false))
          setDatabaseDialogOpen(true)
        }}
        className={classNames(cls.FetchDataForm, [className], {})}
      >
        <h2 className={cls.formTitle}>Заполните форму</h2>
        <div className={cls.dataContainer}>
          <GroupSelect className={cls.select} />
          <DateIntervalInput />
          <fieldset id="group" className={cls.radopGroup}>
            <label htmlFor={'group'}>Сохранить данные</label>
            <div className={cls.radioContainer}>
              <input
                defaultChecked
                onClick={onJsonFormatClick}
                id={'json'}
                type="radio"
                name="group"
              />
              <label className={cls.radiolabel} htmlFor={'json'}>
                в JSON файл
              </label>
            </div>
            <div className={cls.radioContainer}>
              <input onClick={onMySQLFormatClick} id={'db'} type="radio" name="group" />
              <label className={cls.radiolabel} htmlFor={'db'}>
                в базу данных MySQL
              </label>
            </div>
          </fieldset>
        </div>
        <Button
          type={'submit'}
          theme={ButtonTheme.BACKGROUND}
          className={cls.requestButton}
          disabled={!isReady}
        >
          Получить данные
        </Button>
        {isFetching &&
          createPortal(
            <div className={cls.loaderWrapper}>
              <Loader labelClassName={cls.label} label={`Получено данных...${groupInProcess}%`} />
              <Button
                tabIndex={1}
                type={'button'}
                theme={ButtonTheme.BACKGROUND}
                onClick={() => {
                  dispatch(fetchDataFormActions.setCanceled(true))
                }}
                className={cls.cancelButton}
              >
                Прервать
              </Button>
            </div>,
            appContent
          )}
      </AppForm>
      {isDatabaseDialogOpen &&
        createPortal(
          <DatabasePropertiesDialog
            onClose={() => setDatabaseDialogOpen(false)}
            defaultValues={databaseProperties}
            isOpen={isDatabaseDialogOpen}
            onSubmitSuccess={() => {
              setDatabaseDialogOpen(false)
              dispatch(
                fetchData({
                  selectedGroups,
                  groupsList,
                  fromDateValue,
                  toDateValue
                })
              )
              dispatch(saveData(response))
            }}
          />,
          appContent
        )}
    </>
  )
})
