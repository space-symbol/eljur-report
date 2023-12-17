import cls from './MainPage.module.css'
import { classNames } from '@renderer/shared/lib/classNames/classNames'
import { Page } from '@renderer/shared/ui/Page/Page'
import { FetchDataForm } from '@renderer/features/fetchDataForm'

export interface MainPageProps {
  className?: string
}

const MainPage = ({ className }: MainPageProps) => {
  return (
    <Page className={classNames(cls.MainPage, [className], {})}>
      <div className={cls.wrapper}>
        <FetchDataForm />
      </div>
    </Page>
  )
}
export default MainPage
