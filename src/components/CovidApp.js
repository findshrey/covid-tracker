import React from 'react'
import GlobalStats from './GlobalStats'
import Countries from './Countries'

const CovidApp = () => {
   return (
      <>
         <GlobalStats />
         <Countries />
      </>
   )
}

export { CovidApp as default }