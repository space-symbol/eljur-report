import { useSelector } from 'react-redux/es/hooks/useSelector'
import cls from './FetchDataForm.module.css'
import { DateInterval, getFromDate, getToDate } from '@renderer/entities/DateInterval'
import { getGroupList, getGroupSelected, GroupSelect } from '@renderer/entities/Group'
import { classNames } from '@renderer/shared/lib/classNames/classNames'
import { Button, ButtonTheme } from '@renderer/shared/ui/Button/Button'
import { useAppDispatch } from '@renderer/shared/hooks/useAppDispatch/useAppDispatch'
import { fetchData } from '../models/services/fetchData'
import { getFetchDataFormIsLoading } from '@renderer/features/fetchDataForm/models/selectors/fetchDataSelectors'
import { Loader } from '@renderer/shared/ui/Loader/Loader'

interface FetchDataFormProps {
  className?: string
}

export const FetchDataForm = (props: FetchDataFormProps) => {
  const { className } = props
  const dispatch = useAppDispatch()
  const selectedGroups = useSelector(getGroupSelected)
  const fromDate = useSelector(getFromDate)
  const toDate = useSelector(getToDate)
  const dateInterval = `${fromDate.replace(/-/g, '')}-${toDate.replace(/-/g, '')}`
  const groupsList = useSelector(getGroupList)
  const isLoading = useSelector(getFetchDataFormIsLoading)
  const isValid = selectedGroups.length > 0 && dateInterval
  const onFetchButtonClick = () => {
    dispatch(
      fetchData({
        selectedGroups,
        dateInterval,
        groupsList
      })
    )
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={classNames(cls.FetchDataForm, [className], {})}>
          <div className={cls.container}>
            <h1 className={cls.formTitle}>Заполните форму</h1>
            <div className={cls.dataContainer}>
              <GroupSelect className={cls.select} />
              <DateInterval className={cls.dateInterval} label={'Даты'} />
            </div>
            <Button
              onClick={onFetchButtonClick}
              theme={ButtonTheme.BACKGROUND}
              className={cls.requestButton}
              disabled={!isValid || isLoading}
            >
              Получить данные
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
