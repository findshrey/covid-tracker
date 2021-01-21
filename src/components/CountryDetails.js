import React from 'react'
import ReactCountryFlag from "react-country-flag"

const CountryDetails = (props) => {
   return (
      <div className="country-details">
         <div className="country-icon">
            <ReactCountryFlag
               className="country-flag"
               countryCode={props.countryCode}
               svg
               style={{
                  width: "3em",
                  height: "3em"
               }}
               title={props.countryCode}
            />
         </div>
         <div className="cases">
            <span className="detail">{props.totalCases}</span>
            <p className="yesterday">Last 24 Hours: <strong>{props.newCases}</strong></p>
         </div>
         <div className="deaths">
            <span className="detail">{props.totalDeaths}</span>
            <p className="yesterday">Last 24 Hours: <strong>{props.newDeaths}</strong></p>
         </div>
         <div className="recovered">
            <span className="detail">{props.totalRecovered}</span>
            <p className="yesterday">Last 24 Hours: <strong>{props.newRecovered}</strong></p>
         </div>
      </div>
   )
}

export { CountryDetails as default }