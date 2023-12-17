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
  getFetchDataFormIsLoading
} from '../models/selectors/fetchDataSelectors'
import { DateIntervalInput } from '@renderer/entities/DateInterval'
import {
  getDateIntervalFromDateValue,
  getDateIntervalToDateValue
} from '@renderer/entities/DateInterval'
import { getDateIntervalIsValid } from '@renderer/entities/DateInterval'
import { memo } from 'react'
import { getGroupIsValid } from '@renderer/entities/Group'
import { fetchDataFormActions } from '../models/slice/fetchDataFormSlice'
import { AppForm } from '@renderer/shared/ui/AppForm/AppForm'
import { createPortal } from 'react-dom'

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
  const isLoading = useSelector(getFetchDataFormIsLoading)
  const groupSelectIsValid = useSelector(getGroupIsValid)
  const dateIntervalIsValid = useSelector(getDateIntervalIsValid)
  const groupInProcess = useSelector(getFetchDataFormPercentage)
  const isReady = dateIntervalIsValid && groupSelectIsValid && !isLoading

  const appContent = document.querySelector('.app')!
  return (
    <AppForm
      onSubmit={(event) => {
        event.preventDefault()
        dispatch(
          fetchData({
            selectedGroups,
            groupsList,
            fromDateValue,
            toDateValue
          })
        )
      }}
      className={classNames(cls.FetchDataForm, [className], {})}
    >
      <h2 className={cls.formTitle}>Заполните форму</h2>
      <div className={cls.dataContainer}>
        <GroupSelect className={cls.select} />
        <DateIntervalInput />
      </div>
      <Button
        type={'submit'}
        theme={ButtonTheme.BACKGROUND}
        className={cls.requestButton}
        disabled={!isReady}
      >
        Получить данные
      </Button>
      {isLoading &&
        createPortal(
          <div className={cls.loaderWrapper}>
            <Loader labelClassName={cls.label} label={`Получены данных...${groupInProcess}%`} />
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
  )
})
