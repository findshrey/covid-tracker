import React from 'react'

const SummaryBox = (props) => {
   return (
      <div className="summary-box">
         <h3 className="stat-heading">{props.total}</h3>
         <p>{props.about}</p>
      </div>
   )
}

export { SummaryBox as default }