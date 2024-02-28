import React, { useRef } from 'react'
import "./MainPageStyle.css"
import AboutMe from "../AboutMe/aboutme"
import MainPageStarting from '../MainPageStaring/MainPageStarting'
import ScrollTop from '../Utils/scrollTop'
import Header from '../Header/Header'

export default function MainPage() {
  const ref = useRef(null)
 
  return (
    <>
      <Header/>
      <MainPageStarting reference = {ref}/>
      <div ref={ref}>
        <AboutMe ref={ref}/>
      </div>
      <ScrollTop/>
    </>
  )
}
