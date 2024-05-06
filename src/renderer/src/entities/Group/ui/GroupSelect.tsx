import { useEffect, useRef, useState } from 'react'
import { fetchGroups } from '../models/services/fetchGroups/fetchGroups'
import { useSelector } from 'react-redux'
import {
  getGroupError,
  getGroupFilteredGroupsList,
  getGroupIsLoading,
  getGroupSelectedGroupsList,
  getGroupsList
} from '../models/selectors/groupSelectors'
import { useAppDispatch } from '@renderer/shared/hooks/useAppDispatch/useAppDispatch'
import { Input } from '@renderer/shared/ui/Input/Input'
import { Button } from '@renderer/shared/ui/Button/Button'
import { Modes, classNames } from '@renderer/shared/lib/classNames/classNames'
import cls from './GrpupSelect.module.css'
import { groupActions } from '../models/slice/groupSlice'
import { Loader } from '../../../shared/ui/Loader/Loader'

interface GroupSelectProps {
  className?: string
}

export const GroupSelect = (props: GroupSelectProps) => {
  const { className } = props
  const ref = useRef<HTMLDivElement | null>(null)
  const [opened, setOpened] = useState(false)
  const dispatch = useAppDispatch()
  const selectedGroups = useSelector(getGroupSelectedGroupsList)
  const filteredGroups = useSelector(getGroupFilteredGroupsList)
  const error = useSelector(getGroupError)
  const isLoading = useSelector(getGroupIsLoading)
  const groupsList = useSelector(getGroupsList)

  useEffect(() => {
    if (groupsList.length === 0) {
      dispatch(fetchGroups())
    }
    document.addEventListener('mousedown', onOutSideClick)
    return () => {
      document.removeEventListener('mousedown', onOutSideClick)
    }
  }, [groupsList])
  const onOutSideClick = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpened(false)
    }
  }
  const onChangeInput = (value: string) => {
    dispatch(groupActions.filterGroupsList(value))
  }
  const onUnselectedGroupClick = (group: string) => {
    dispatch(groupActions.setSelectedGroups(group))
  }
  const onSelectedGroupClick = (group: string) => {
    dispatch(groupActions.removeSelectedGroup(group))
  }
  const selectedGroupsList = () =>
    selectedGroups?.map((option) => (
      <Button
        type={'button'}
        className={classNames(cls.option, [cls.selected], {
          [cls.allSelectButtonActive]: option === 'Все'
        })}
        key={`selected:${option}`}
        onClick={() => onSelectedGroupClick(option)}
      >
        {option}
      </Button>
    ))
  const unselectedGroupsList = () =>
    filteredGroups.map((option) => (
      <Button
        onClick={() => onUnselectedGroupClick(option)}
        type={'button'}
        className={classNames(cls.option, [cls.unselected], {
          [cls.allSelectButton]: option === 'Все'
        })}
        key={`other:${option}`}
      >
        {option}
      </Button>
    ))

  const modes: Modes = {
    [cls.withError]: error
  }

  return (
    <div className={classNames(cls.wrapper, [className], modes)}>
      <span className={cls.label}>Группа(ы)</span>
      <div className={cls.selectButtonWrapper}>
        {isLoading ? (
          <Loader className={cls.loader} />
        ) : (
          <Button
            type={'button'}
            className={cls.openSelectModalButton}
            onClick={() => {
              setOpened(true)
            }}
          >
            Выбрать
          </Button>
        )}
        <span className={classNames(cls.errorMessage, ['error'])}>{error}</span>
      </div>
      {opened && (
        <div className={cls.selectGroupModal} ref={ref}>
          <div className={cls.container}>
            <div className={cls.inputWrapper}>
              <Input onChange={({ target }) => onChangeInput(target.value)} type="text" />

            </div>
            {!!selectedGroups.length && (
              <div
                className={classNames(cls.selectedOptions, [], {
                  [cls.bottomBorder]: !!filteredGroups.length
                })}
              >
                {selectedGroupsList()}
              </div>
            )}
            {!!filteredGroups.length && (
              <div className={classNames(cls.unselectedOptions, [], {})}>
                {unselectedGroupsList()}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
