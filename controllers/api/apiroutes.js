//require the express framework
const { request } = require('express');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Checking in ');
});
app.get('/api/courses', (req, res) => {
  res.send([]);
});

app.listen(3000, () => console.log('Listening on port 3000...'));

const jobSearch = new JobSearch
jobSearch.setCountryCode();
jobSearch.configureFormListener();

export class JobSearch {

  constructor() { }
  //Something is wonky above recheck//

  setCountryCode() {
    this.countryCode = 'us';
    this.setCurrencySymbol();

    fetch('http://ip-api.com/json')
      .then(results => results.json())
      .then(results => {
        this.countryCode = results.countryCode.toLowerCase();
        this.setCurrencySymbol();
      });
  }

  setCurrencySymbol() {
    this.currencySymbol = getCurrencySymbol(this.countryCode);
  }

  configureFormListener() {
    this.searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.startLoading();
      this.resultsContainer.innerHTML = '';
      const { search, location } = extractFormData(this.searchForm);
      fetch(`http://localhost:3000/?search=${search}&location=${location}&country=${this.countryCode}`)
        .then(response => response.json())
        .then(({ results }) => {
          this.stopLoading();
          return results
            .map(job => jobTemplate(job, this.currencySymbol))
            .join('');
        })
        .then(jobs => this.resultsContainer.innerHTML = jobs)
        .catch(() => this.stopLoading());
    });
  }

  startLoading() {
    this.loadingElement.classList.add('loading');
  }

  stopLoading() {
    this.loadingElement.classList.remove('loading');
  }
}
