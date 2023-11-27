import { Select, SelectOption } from '@renderer/shared/ui/Select/Select'
import { useEffect } from 'react'
import { fetchGroups } from '../models/services/fetchGroups/fetchGroups'
import { useSelector } from 'react-redux'
import { getGroupList, getGroupSelected } from '../models/selectors/groupSelectors'
import { useAppDispatch } from '@renderer/shared/hooks/useAppDispatch/useAppDispatch'
import { groupActions } from '../models/slice/groupSlice'

interface GroupSelectProps {
  className?: string
}

export const GroupSelect = (props: GroupSelectProps) => {
  const { className } = props
  const dispatch = useAppDispatch()
  const groupsList = useSelector(getGroupList)
  const selectedItems = useSelector(getGroupSelected)

  useEffect(() => {
    dispatch(fetchGroups())
    dispatch(groupActions.setSelected(groupsList[0]))
  }, [])

  const options: SelectOption[] = groupsList.map((group) => {
    return {
      value: group,
      content: group
    }
  })
  const onChangeSelect = (value: string) => {
    dispatch(groupActions.setSelected(value))
  }

  return (
    <Select
      selectedItems={selectedItems}
      onChange={onChangeSelect}
      className={className}
      label={'Группа'}
      options={options}
    />
  )
}
