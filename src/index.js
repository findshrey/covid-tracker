import React from 'react'
import ReactDOM from 'react-dom'
import './styles/style.scss'

const Template = () => {
   return (
      <div>
         <h1>Title</h1>
         <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam, sequi?</p>
      </div>
   )
}

ReactDOM.render(<Template />, document.getElementById('root'))