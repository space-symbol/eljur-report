import { classNames } from '@renderer/shared/lib/classNames/classNames'
import cls from './ProfilePage.module.css'
import { Page } from '@renderer/shared/ui/Page/Page'
import { Button } from '@renderer/shared/ui/Button/Button'
import { ButtonTheme } from '@renderer/shared/ui/Button/Button'
import { useSelector } from 'react-redux'
import { getUserAuthData, userActions } from '@renderer/entities/User'
import { Navigate } from 'react-router-dom'
import { useAppDispatch } from '@renderer/shared/hooks/useAppDispatch/useAppDispatch'
import RefreshIcon from '@renderer/assets/icons/refresh-icon.svg?react'

import { DataField } from '@renderer/shared/ui/DataField/ui/DataField'
import { authWithoutToken } from '@renderer/features/authByApiForm'
export interface ProfilePageProps {
  className?: string
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  const dispatch = useAppDispatch()
  const authData = useSelector(getUserAuthData)
  if (!authData) {
    return <Navigate to={'/auth'}></Navigate>
  }
  authData.password

  const { login, devkey, authToken, password } = authData
  const onRefreshIconClick = () => {
    dispatch(
      authWithoutToken({
        login,
        devkey,
        password
      })
    )
  }
  return (
    <Page>
      <div className={classNames(cls.ProfilePage, [className], {})}>
        <div className={cls.data}>
          <h2 className={cls.dataTitle}>Ваши данные</h2>
          <div className={cls.dataFieldsContainer}>
            <DataField fieldValue={login} label={'Логин'} />
            <DataField fieldValue={devkey} label={'Ключ разработчика (devkey)'} />
            <DataField
              fieldValue={authToken}
              Icon={RefreshIcon}
              label={'Токен пользователя (auth_token)'}
              onIconClick={onRefreshIconClick}
            />
          </div>
          <Button
            tabIndex={3}
            onClick={() => dispatch(userActions.logout())}
            className={cls.logoutButton}
            theme={ButtonTheme.BACKGROUND}
          >
            Выйти
          </Button>
        </div>
      </div>
    </Page>
  )
}
export default ProfilePage
