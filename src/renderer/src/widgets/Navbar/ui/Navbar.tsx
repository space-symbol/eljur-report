import { classNames } from '@renderer/shared/lib/classNames/classNames'
import cls from './Navbar.module.css'
import { useSelector } from 'react-redux'
import { getUserAuthData } from '@renderer/entities/User'
import { navbarItemsList } from '../models/items'
import { NavLink } from 'react-router-dom'

interface NavbarProps {
  className?: string
}

export const Navbar = ({ className }: NavbarProps) => {
  const authData = useSelector(getUserAuthData)
  const renderNavbarLinks = () =>
    navbarItemsList.map(({ path, text, authOnly }) => {
      if (authOnly && !authData) {
        return null
      }
      return (
        <NavLink
          className={(navData) => classNames(cls.link, [navData.isActive ? cls.active : ''])}
          key={path}
          to={path}
        >
          {text}
        </NavLink>
      )
    })
  return <div className={classNames(cls.Navbar, [className], {})}>{renderNavbarLinks()}</div>
}
