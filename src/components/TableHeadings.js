import React from 'react'

const TableHeadings = () => {
   return (
      <div className="table-headings">
         <p className="heading">Country</p>
         <p className="heading">Cases</p>
         <p className="heading">Deaths</p>
         <p className="heading">Recovered</p>
      </div>
   )
}

export { TableHeadings as default }