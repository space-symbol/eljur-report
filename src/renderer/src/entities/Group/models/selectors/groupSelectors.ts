import { StateSchema } from '@renderer/shared/config/StoreConfig/StateSchema'

export const getGroupList = (state: StateSchema) => state.group.groupsList
export const getGroupSelected = (state: StateSchema) => state.group.selected
