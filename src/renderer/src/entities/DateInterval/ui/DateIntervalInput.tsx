import { classNames } from '@renderer/shared/lib/classNames/classNames'
import cls from './DateIntervalInput.module.css'
import { Input } from '@renderer/shared/ui/Input/Input'
import { memo, useState } from 'react'
import { dateIntervalActions } from '../models/slice/dateIntervalSlice'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import {
  getDateIntervalError,
  getDateIntervalIsValid
} from '../models/selectors/dateIntervalSelectors'

interface DateIntervalProps {
  className?: string
}

export const DateIntervalInput = memo((props: DateIntervalProps) => {
  const { className } = props
  const dispatch = useDispatch()
  const currentDate = new Date()
  const previousDate = new Date(new Date().setDate(currentDate.getDate() - 1))
  const formattedDefaultFromDate = previousDate.toISOString().substring(0, 10)
  const formattedDefaultToDate = currentDate.toISOString().substring(0, 10)

  const [fromDateValue, setFromDateValue] = useState(formattedDefaultFromDate)
  const [toDateValue, setToDateValue] = useState(formattedDefaultToDate)
  const error = useSelector(getDateIntervalError)
  const isValid = useSelector(getDateIntervalIsValid)
  const maxDate = new Date(new Date().setDate(currentDate.getFullYear() + 2))
    .toISOString()
    .substring(0, 10)
  const onFromDateInputChange = (value: string) => {
    setFromDateValue(value)
  }
  const onToDateInputChange = (value: string) => {
    setToDateValue(value)
  }
  const onFromDateInputBlur = () => {
    if (!fromDateValue || !toDateValue) {
      dispatch(dateIntervalActions.setIsValid(false))
      dispatch(dateIntervalActions.setError('Даты должны быть заполнены'))
      return
    }
    const fromDate = new Date(fromDateValue)
    const toDate = new Date(toDateValue)
    if (fromDate > toDate) {
      setFromDateValue(toDateValue)
    } else {
      dispatch(dateIntervalActions.setFromDateValue(fromDateValue))
    }
    if (moment(toDate).diff(fromDate, 'month') > 9) {
      dispatch(dateIntervalActions.setIsValid(false))
      dispatch(
        dateIntervalActions.setError('Разница между датами не должна составлять более 9 месяцев')
      )
    } else {
      if (!isValid) {
        dispatch(dateIntervalActions.setIsValid(true))
        dispatch(dateIntervalActions.setError(''))
      }
    }
  }
  const onToDateInputBlur = () => {
    if (!fromDateValue || !toDateValue) {
      dispatch(dateIntervalActions.setIsValid(false))
      dispatch(dateIntervalActions.setError('Даты должны быть заполнены'))
      return
    }
    const fromDate = new Date(fromDateValue)
    const toDate = new Date(toDateValue)

    if (fromDate > toDate) {
      setFromDateValue(toDateValue)
    }
    if (moment(toDate).diff(fromDate, 'month') > 9) {
      dispatch(dateIntervalActions.setIsValid(false))
      dispatch(
        dateIntervalActions.setError('Разница между датами не должна составлять более 9 месяцев')
      )
    } else {
      if (!isValid) {
        dispatch(dateIntervalActions.setIsValid(true))
        dispatch(dateIntervalActions.setError(''))
      }
      dispatch(dateIntervalActions.setToDateValue(toDateValue))
    }
  }
  const modes = {
    [cls.withError]: error
  }

  return (
    <div className={classNames(cls.DateInterval, [className], modes)}>
      {<label className={cls.dateIntervalLabel}>Даты</label>}
      <div className={cls.wrapper}>
        <div className={cls.dateInterval}>
          <Input
            type="date"
            onChange={({ target }) => onFromDateInputChange(target.value)}
            onBlur={onFromDateInputBlur}
            value={fromDateValue}
            max={maxDate}
          />
          <span className={cls.dash}>-</span>
          <Input
            type="date"
            onChange={({ target }) => onToDateInputChange(target.value)}
            onBlur={onToDateInputBlur}
            value={toDateValue}
            max={maxDate}
          />
        </div>
        <span className={classNames(cls.errorMessage, ['error'])}>{error}</span>
      </div>
    </div>
  )
})
