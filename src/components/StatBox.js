import React from 'react'

const StatBox = (props) => {
   return (
      <div className="stat-box">
         <h3 className="stat-heading">{props.total}</h3>
         <p>{props.about}</p>
      </div>
   )
}

export { StatBox as default }