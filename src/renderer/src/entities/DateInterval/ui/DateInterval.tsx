import { classNames } from '@renderer/shared/lib/classNames/classNames'
import cls from './DateInterval.module.css'
import { Input } from '@renderer/shared/ui/Input/Input'
import { useDispatch, useSelector } from 'react-redux'
import { getFromDate, getToDate } from '../models/selectors/groupSelectors'
import { dateIntervalActions } from '../models/slice/dateIntervalSlice'

interface DateIntervalProps {
  className?: string
  label?: string
}

export const DateInterval = (props: DateIntervalProps) => {
  const { className, label } = props
  const dispatch = useDispatch()
  const fromDate = useSelector(getFromDate)
  const toDate = useSelector(getToDate)
  const onChangeFromDate = (value: string) => {
    console.log(value)
    dispatch(dateIntervalActions.setFromDate(value))
  }
  const onChangeToDate = (value: string) => {
    dispatch(dateIntervalActions.setToDate(value))
  }
  const maxDate = new Date().toLocaleDateString().split('.').reverse().join('-')

  return (
    <div className={classNames(cls.DateInterval, [className])}>
      {label && <label className={cls.dateIntervalLabel}>{label}</label>}

      <div className={cls.dateInterval}>
        <Input type="date" value={fromDate} onChange={onChangeFromDate} max={maxDate} />
        <span className={cls.dash}>-</span>
        <Input type="date" value={toDate} onChange={onChangeToDate} max={maxDate} />
      </div>
    </div>
  )
}
