import { classNames } from '@renderer/shared/lib/classNames/classNames'
import cls from './AuthForm.module.css'
import { Input } from '@renderer/shared/ui/Input/Input'
import { Button } from '@renderer/shared/ui/Button/Button'
import { ButtonTheme } from '@renderer/shared/ui/Button/Button'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import {
  getAuthByApiFormLogin,
  getAuthByApiFormPassword,
  getAuthByApiFormDevkey,
  getAuthByApiFormAuthToken,
  getAuthByApiFormIsValid,
  getAuthByApiFormError
} from '../models/selectors/authByApiFormSelectrors/authByApiFormSelectors'
import { useAppDispatch } from '@renderer/shared/hooks/useAppDispatch/useAppDispatch'
import { authByApiActions } from '../models/slice/authByApiFormSlice'
import React, { useEffect } from 'react'
import { authWithoutToken } from '../models/services/authWithoutToken'
import { authWithToken } from '../models/services/authWithToken'
import { getUserAuthData } from '@renderer/entities/User'
import { Navigate } from 'react-router-dom'
import { RoutePath } from '@renderer/shared/config/routeConfig/routeConfig'
import { AppForm } from '@renderer/shared/ui/AppForm/AppForm'
export interface AuthFormProps {
  className?: string
}

const AuthForm = ({ className }: AuthFormProps) => {
  const dispatch = useAppDispatch()
  const login = useSelector(getAuthByApiFormLogin)
  const password = useSelector(getAuthByApiFormPassword)
  const devkey = useSelector(getAuthByApiFormDevkey)
  const authToken = useSelector(getAuthByApiFormAuthToken)
  const isRequiredFilled = useSelector(getAuthByApiFormIsValid)
  const authData = useSelector(getUserAuthData)
  const error = useSelector(getAuthByApiFormError)

  useEffect(() => {
    const filled = login && password && devkey
    if (filled) {
      dispatch(authByApiActions.setIsValid(true))
    } else {
      dispatch(authByApiActions.setIsValid(false))
    }
  }, [login, password, devkey])
  const onLoginChange = (value: string) => {
    dispatch(authByApiActions.setLogin(value))
  }

  const onPasswordChange = (value: string) => {
    dispatch(authByApiActions.setPassword(value))
  }

  const onDevkeyChange = (value: string) => {
    dispatch(authByApiActions.setDevkey(value))
  }

  const onApiTokenChange = (value: string) => {
    dispatch(authByApiActions.setApiToken(value))
  }
  if (authData) {
    return <Navigate to={RoutePath.main} />
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!authToken) {
      dispatch(
        authWithoutToken({
          login,
          password,
          devkey
        })
      )
    } else {
      const res = await dispatch(
        authWithToken({
          login,
          password,
          devkey,
          authToken
        })
      )
      if (res.meta.requestStatus === 'rejected') {
        dispatch(
          authWithoutToken({
            login,
            password,
            devkey
          })
        )
      }
    }
  }
  return (
    <AppForm onSubmit={onSubmit} className={classNames(cls.AuthForm, [className], {})}>
      <h2 className={cls.formTitle}>Вход</h2>
      <Input
        className={cls.input}
        onChange={onLoginChange}
        value={login}
        label={'Логин'}
        required
      />
      <Input
        type={'password'}
        className={cls.input}
        onChange={onPasswordChange}
        value={password}
        label={'Пароль'}
        required
      />
      <Input
        type={'password'}
        className={cls.input}
        onChange={onDevkeyChange}
        value={devkey}
        label={'Ключ разработчика (devkey)'}
        required
      />
      <Input
        type={'password'}
        className={cls.input}
        onChange={onApiTokenChange}
        value={authToken}
        label={'Токен пользователя (auth_token, если есть)'}
      />
      <Button
        className={cls.submitButton}
        type={'submit'}
        disabled={!isRequiredFilled}
        theme={ButtonTheme.BACKGROUND}
      >
        Войти
      </Button>
      <span className={'error'}>{error}</span>
    </AppForm>
  )
}
export default AuthForm
