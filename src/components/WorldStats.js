import React from 'react'

const WorldStats = props => {
   return (
      <div className="world-stats-box">
         <h1 className="total-numbers">{props.total}</h1>
         <p className="about">{props.about}</p>
      </div>
   )
}

export { WorldStats as default }