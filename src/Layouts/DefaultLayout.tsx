import { Outlet } from 'react-router-dom'
import Search from '../Components/SearchBar/Search'

export default function DefaultLayout() {
  return (
    <>
      <Search />
      <Outlet />
    </>
  )
}
