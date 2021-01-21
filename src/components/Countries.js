import React from 'react'
import axios from 'axios'
import ArraySort from 'array-sort'
import NumberFormat from 'react-number-format'
import TableHeadings from './TableHeadings'
import CountryDetails from './CountryDetails'
import Spinner from './Spinner'

class Countries extends React.Component {
   state = {
      countryDetails: [],
      searchedCountries: []
   }

   // Fetch countries
   async componentDidMount() {
      const response = await axios.get('https://api.covid19api.com/summary')

      let countryData = response.data.Countries
      countryData = ArraySort(countryData, 'TotalConfirmed', { reverse: true })

      this.setState(() => ({ countryDetails: countryData, searchedCountries: countryData }))
   }

   // Sort countries by cases
   handleSort = (e) => {
      const sortValue = e.target.value
      let sortByHighest = true

      if (sortValue === 'lowest') {
         sortByHighest = false
      }

      const sortedCountries = ArraySort(this.state.countryDetails, 'TotalConfirmed', { reverse: sortByHighest })
      this.setState(() => ({ searchedCountries: sortedCountries }))
   }

   // Search countries
   handleSearch = (e) => {
      const searchValue = e.target.value

      // Collect matched countries
      let filteredCountries = []

      if (searchValue.trim()) {
         this.state.countryDetails.map((country, index) => {
            const countryIndex = country.Country.toLowerCase().search(searchValue.toLowerCase())

            if (countryIndex !== -1) {
               filteredCountries.push(this.state.countryDetails[index])
            }
         })

         filteredCountries = ArraySort(filteredCountries, 'TotalConfirmed', { reverse: true })
         this.setState({ searchedCountries: filteredCountries })
      }
   }

   render() {
      const formatNum = (num) => {
         return <NumberFormat value={num} thousandSeparator={true} displayType="text" />
      }

      const countryList = this.state.countryDetails.length > 0 ?
         this.state.searchedCountries.map((country, index) => {
            return <CountryDetails
               key={index}
               countryCode={country.CountryCode}
               totalCases={formatNum(country.TotalConfirmed)}
               newCases={formatNum(country.NewConfirmed)}
               totalDeaths={formatNum(country.TotalDeaths)}
               newDeaths={formatNum(country.NewDeaths)}
               totalRecovered={formatNum(country.TotalRecovered)}
               newRecovered={formatNum(country.NewRecovered)}
            />
         }) : null

      return (
         <section className="countries">
            <div className="container">
               <h2>Countries Affected</h2>
               <div className="filtering">
                  <input type="text" placeholder="Enter Country Name" onChange={this.handleSearch} />
                  <select className="sort-by" onChange={this.handleSort}>
                     <option value="highest">Highest</option>
                     <option value="lowest">Lowest</option>
                  </select>
               </div>
               <TableHeadings />
               {
                  this.state.countryDetails.length < 1 ? <Spinner /> : countryList
               }
            </div>
         </section>
      )
   }
}

export { Countries as default }