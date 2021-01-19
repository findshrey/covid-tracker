import React from 'react'
import axios from 'axios'
import NumberFormat from 'react-number-format';
import WorldStats from './WorldStats'

class CovidApp extends React.Component {
   state = {
      result: {
         "TotalConfirmed": 0,
         "TotalDeaths": 0,
         "TotalRecovered": 0,
         "ActiveCase": 0
      }
   }

   async componentDidMount() {
      const globalData = await axios.get('https://api.covid19api.com/summary')

      let corona = globalData.data.Global
      // console.log(corona);

      this.setState({
         result: {
            "TotalConfirmed": corona.TotalConfirmed,
            "TotalDeaths": corona.TotalDeaths,
            "TotalRecovered": corona.TotalRecovered,
            "ActiveCase": corona.TotalConfirmed - (corona.TotalDeaths + corona.TotalRecovered)
         }
      })
   }

   render() {
      let stats = Object.keys(this.state.result).map((key, index) => {
         return <WorldStats
            key={index}
            about={key}
            total={<NumberFormat value={this.state.result[key]} thousandSeparator={true} displayType="text" />} />
      })
      // console.log(stats);

      return (
         <div className="global">
            <h1 className="heading">Covid-19 Tracker</h1>
            <p className="description">Let's Check information about Covid-19</p>

            <div className="world-stats">
               {
                  stats
               }
            </div>
         </div>
      )
   }
}

export { CovidApp as default }