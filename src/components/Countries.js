import React from 'react'
import axios from 'axios'
import ArraySort from 'array-sort'
import HeadingNames from './HeadingNames'
import NumberFormat from 'react-number-format'
import CountryDetails from './CountryDetails'
import Spinner from './Spinner'

class Countries extends React.Component {
   state = {
      countryDetails: [],
      searchedCountries: []
   }

   async componentDidMount() {
      const responseData = await axios.get('https://api.covid19api.com/summary')

      let countryData = responseData.data.Countries
      countryData = ArraySort(countryData, 'TotalConfirmed', { reverse: true })

      this.setState({ countryDetails: countryData, status: true, selectedData: countryData })
   }

   searchCountry = (e) => {
      const value = e.target.value
      let countryDetails = this.state.countryDetails

      let findSpecificCountry = []

      if (value) {
         countryDetails.map((cou, index) => {
            const finder = cou.Country.toLowerCase().search(value.toLowerCase())

            if (finder !== -1) {
               findSpecificCountry.push(countryDetails[index])
            }
         })

         findSpecificCountry = ArraySort(findSpecificCountry, 'TotalConfirmed', { reverse: true })
         this.setState({ searchedCountries: findSpecificCountry })
      } else {
         this.setState({ countryDetails: countryDetails })
      }

      if (value.length === 0) {
         this.setState({ selectedData: this.state.countryDetails })
      } else {
         this.setState({ selectedData: this.state.searchedCountries })
      }
   }

   changeSortValue = (e) => {
      const value = e.target.value
      let sortByReverse = true

      if (value === 'highest') {
         sortByReverse = true
      } else {
         sortByReverse = false
      }

      const countryData = ArraySort(this.state.countryDetails, 'TotalConfirmed', { reverse: sortByReverse })

      this.setState({ countryDetails: countryData, status: true })
   }

   render() {
      const formatNumber = (val) => {
         return <NumberFormat value={val} thousandSeparator={true} displayType="text" />
      }

      const countryList = this.state.countryDetails.length > 0 ?
         this.state.selectedData.map((country, index) => {
            return <CountryDetails
               key={index}
               countryCode={country.CountryCode}
               totalCases={formatNumber(country.TotalConfirmed)}
               newCases={formatNumber(country.NewConfirmed)}
               totalDeaths={formatNumber(country.TotalDeaths)}
               newDeaths={formatNumber(country.NewDeaths)}
               totalRecovered={formatNumber(country.TotalRecovered)}
               newRecovered={formatNumber(country.NewRecovered)}
            />
         }) : null

      return (
         <section className="countries-stats">
            <div className="container">
               <h2>Countries Stats</h2>
               {/* Make this V a component as well */}
               <div className="filtering">
                  <input type="text" placeholder="Enter Country Name" onChange={this.searchCountry} />
                  <select className="sort-by" onChange={this.changeSortValue}>
                     <option value="highest">Highest</option>
                     <option value="lowest">Lowest</option>
                  </select>
               </div>
               <HeadingNames />
               {
                  this.state.countryDetails.length < 1 ? <Spinner /> : null
               }
               {
                  countryList
               }
            </div>
         </section>
      )
   }
}

export { Countries as default }