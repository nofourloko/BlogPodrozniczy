import React from 'react'
import {Routes, Route } from 'react-router-dom'
import MainPage from './MainPage/MainPage'
import TravelReportsMain from './ TravelReports/TravelReportsMain/TravelReportsMain'
import PickedDestination from './Destination/PickedDestination/pickedDestination'
import Error from './Utils/error'
import Login from './AdminPanel/Login/Login'
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import ArticleAdd from './AdminPanel/ArticleAdd/ArticleAdd'
import SuccessPage from './AdminPanel/Success/SuccessPage'

export default function App() {
  return (
    <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path = "/relacje" element = { <TravelReportsMain />} />
        <Route path = "relacje/:country/:place" element = { <PickedDestination />} />
        <Route path = "relacje/:country" element = { <TravelReportsMain /> }/>
        <Route path = "/admin" element = { <Login/>} />
        <Route element={<AuthOutlet fallbackPath='/admin' />}>
            <Route path='/admin/dodanie' element = {<ArticleAdd />} />
            <Route path='/admin/sukces/:country/:place' element = {<SuccessPage />} />
        </Route>
        
        <Route path='*' element = {<Error />} />
    </Routes>
  )
}
