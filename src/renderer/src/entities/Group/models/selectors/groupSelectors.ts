import { StateSchema } from '@renderer/shared/config/StoreConfig/StateSchema'

export const getGroupsList = (state: StateSchema) => state.group.groupsList
export const getGroupSelectedGroupsList = (state: StateSchema) => state.group.selectedGroupsList
export const getGroupFilteredGroupsList = (state: StateSchema) => state.group.filteredGroupsList
export const getGroupError = (state: StateSchema) => state.group.error
export const getGroupIsValid = (state: StateSchema) => state.group.isValid
export const getGroupIsLoading = (state: StateSchema) => state.group.isLoading
