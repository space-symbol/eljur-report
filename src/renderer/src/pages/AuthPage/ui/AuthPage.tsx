import { classNames } from '@renderer/shared/lib/classNames/classNames'
import cls from './AuthPage.module.css'
import { Page } from '@renderer/shared/ui/Page/Page'
import {
  DynamicModuleLoader,
  ReducersList
} from '@renderer/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { AuthFormAsync, authByApiReducer } from '@renderer/features/authByApiForm'

export interface AuthPageProps {
  className?: string
}
const reducers: ReducersList = {
  authForm: authByApiReducer
}

const AuthPage = ({ className }: AuthPageProps) => {
  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page>
        <div className={classNames(cls.AuthPage, [className], {})}>
          <AuthFormAsync />
        </div>
      </Page>
    </DynamicModuleLoader>
  )
}

export default AuthPage
