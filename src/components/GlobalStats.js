import React from 'react'
import axios from 'axios'
import NumberFormat from 'react-number-format';
import StatBox from './StatBox'

class GlobalStats extends React.Component {
   state = {
      result: {
         "TotalConfirmed": 0,
         "TotalDeaths": 0,
         "TotalRecovered": 0,
         "ActiveCase": 0
      }
   }

   async componentDidMount() {
      const covidData = await axios.get('https://api.covid19api.com/summary')

      const corona = covidData.data.Global

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
      const statistics = Object.keys(this.state.result).map((objectKey, index) => {
         return <StatBox
            key={index}
            about={objectKey}
            total={<NumberFormat value={this.state.result[objectKey]} thousandSeparator={true} displayType="text" />} />
      })

      return (
         <header className="global-stats">
            <div className="container">
               <h1>Covid-19 Tracker</h1>
               <p className="description">Let's Check information about Covid-19</p>
               <div className="global-stats-row">
                  {
                     statistics
                  }
               </div>
            </div>
         </header>
      )
   }
}

export { GlobalStats as default }