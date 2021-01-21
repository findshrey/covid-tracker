import React from 'react'
import axios from 'axios'
import NumberFormat from 'react-number-format';
import SummaryBox from './SummaryBox'

class GlobalStats extends React.Component {
   state = {
      result: {
         "totalConfirmed": 0,
         "totalDeaths": 0,
         "totalRecovered": 0,
         "activeCase": 0
      }
   }

   async componentDidMount() {
      const response = await axios.get('https://api.covid19api.com/summary')
      const covidData = response.data.Global

      this.setState({
         result: {
            "totalConfirmed": covidData.TotalConfirmed,
            "totalDeaths": covidData.TotalDeaths,
            "totalRecovered": covidData.TotalRecovered,
            "activeCase": covidData.TotalConfirmed - (covidData.TotalDeaths + covidData.TotalRecovered)
         }
      })
   }

   render() {
      const globalSummary = Object.keys(this.state.result).map((objectKey, index) => {
         return <SummaryBox
            key={index}
            about={objectKey}
            total={<NumberFormat value={this.state.result[objectKey]} thousandSeparator={true} displayType="text" />} />
      })

      return (
         <header className="main-head">
            <div className="container-m">
               <h1>Covid-19 Tracker</h1>
               <p className="description">Let's check information about Covid-19</p>
               <div className="global-summary">
                  {
                     globalSummary
                  }
               </div>
            </div>
         </header>
      )
   }
}

export { GlobalStats as default }