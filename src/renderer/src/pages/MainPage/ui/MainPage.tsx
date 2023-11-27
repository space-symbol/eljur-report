import cls from './MainPage.module.css'
import { classNames } from '@renderer/shared/lib/classNames/classNames'
import { Page } from '@renderer/shared/ui/Page/Page'
import { FetchDataForm } from '@renderer/features/fetchDataForm'
import { ReactElement } from 'react'

export interface MainPageProps {
  className?: string
}

const MainPage = ({ className }: MainPageProps): ReactElement => {
  return (
    <Page className={classNames(cls.MainPage, [className], {})}>
      <FetchDataForm />
    </Page>
  )
}
export default MainPage
