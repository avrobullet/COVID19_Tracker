// Canadian Provinces and Territories (in no particular order)
canadian_provinces_territories = ['Alberta',
    'British Columbia',
    'Nova Scotia',
    'Quebec',
    'Ontario',
    'New Brunswick',
    'Manitoba',
    'Prince Edward Island',
    'Saskatchewan',
    'Newfoundland and Labrador',
    'Yukon',
    'Nunavut',
    'Northwest Territories']
// Create functions
function getProvinceStats() {
    //Get Canadian COVID19 stats
    var request = new XMLHttpRequest()
    request.open('GET', 'https://api.covid19api.com/live/country/Canada/status/confirmed/date/2020-03-21T13:13:30Z', true)
    request.onload = function() {
        //Get COVID19 stats per country
        var stats = JSON.parse(this.response)
        if (request.status >= 200 && request.status < 400)
        {
            displayProvinceStats(stats)
        } else {
            console.log('error')
        }
    }
    request.send()
}
function displayProvinceStats(stats){
    //if (new_province_selected ==> display stats)
    //else (previous_province_selected ==> page remains unchanged)
    //Collect COVID19 confirmed, deaths, and recoveries (COVID19 stats)
    console.log(stats)
    for (let key in canadian_provinces_territories) {
        selected_province_territory = canadian_provinces_territories[key]
        for (let key in stats) {
            console.log(stats[key].Recovered)
            if (selected_province_territory.toLowerCase().trim() == stats[key].Province.toLowerCase().trim()) {
                valid_land = true
                current_province_key = key
                calculateData(key,stats)
            }
        }
        // Only create COVID19 stats if currently selected province/territory is found
        if (valid_land == true) {
            //Post COVID19 stats onto 'cards'
            const card = document.createElement('div')
            card.setAttribute('class', 'card')

            //Store COVID19 stats to display as a table (Convert to dictionnary where each label includes a type of colour)
            const table = document.createElement("table")
            selected_display_stats = {
                "Currently Known Cases": current_confirmed,
                "Currently Known Deaths": current_deaths,
                "Currently Known Active": current_active,
                "Total Recovered": total_recovered
            }

            //Set provinces/territories per card
            createTable(table,selected_display_stats)
            const h1 = document.createElement('h1')
            h1.textContent = stats[current_province_key].Province

            //Display content on each card
            container.appendChild(card)
            card.appendChild(h1)
            card.appendChild(table)
        }
        //Reset flag for found province/territory
        valid_land = false
    }
}
function calculateData(key,stats) {
    current_active = stats[key].Active
    current_confirmed = stats[key].Confirmed
    current_deaths = stats[key].Deaths
    //Use reported recovered cases if known...
    current_recovered = stats[key].Recovered
    //...Or provide an estimate as to how many have recovered
    if (stats[key].Recovered = 0) {
        //current_recovered += current_confirmed - current_active - current_deaths
    }
    total_recovered += current_recovered
}
function createTable(table, data) {
    //Create table with selected data stats
    let table_row = table.insertRow()
    let table_head = table.createTHead()
    let head_row = table_head.insertRow()
    for (key in data) {
        let cell = table_row.insertCell()
        let data_value = document.createTextNode(data[key])
        cell.appendChild(data_value)
        let th = document.createElement("th")
        let data_header = document.createTextNode(key)
        th.appendChild(data_header)
        head_row.appendChild(th)
        //Format
        cell.style.fontWeight = "bold";
        cell.style.textAlign = "center";
        cell.style.padding = "5px";
        th.style.wordSpacing = "3px";
        th.style.padding = "5px";
    }
}
// Initialize HTML elements
const app = document.getElementById('root')
const container = document.createElement('div')
container.setAttribute('class', 'container')
app.appendChild(container)
getProvinceStats()

//Initialize variables
let valid_land = false
total_active = 0
total_confirmed = 0
total_deaths = 0
total_recovered = 0
current_active = 0
current_confirmed = 0
current_deaths = 0
current_recovered =0
let selected_display_stats = []