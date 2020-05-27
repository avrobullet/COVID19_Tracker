//Months...
months = ['January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]
// Canadian Provinces and Territories (in no particular order)
canadian_stats = {
    land: ['Alberta',
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
        'Northwest Territories'],
    active:['blue','25px'],
    confirmed: ['orange','25px'],
    deaths:['red','25px'],
    recovered: ['green','25px']
}
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
    //Collect COVID19 confirmed, deaths, and recoveries (COVID19 stats)
    for (let key in canadian_stats.land) {
        selected_province_territory = canadian_stats.land[key]
        for (let key in stats) {
            // Process province's/territories' corresponding data
            if (selected_province_territory.toLowerCase().trim() == stats[key].Province.toLowerCase().trim()) {
                valid_land = true
                current_province_key = key
                processData(key,stats)
            }
        }
        // Only create COVID19 stats if currently selected province/territory is found
        if (valid_land == true) {
            //Post latest COVID19 time stamp
            let date = current_timestamp.slice(0, 10)
            let time = current_timestamp.slice(11, 19)
            date = new Date(date)
            let month = months[date.getMonth()]+' '
            let day = date.getDay()+''
            let year = date.getFullYear()+''
            new_date = month.concat(day,' ,',year)
            document.getElementById("timestamp_update").innerHTML = 'As of '+new_date;

            //Post COVID19 stats onto 'cards'
            const card = document.createElement('div')
            card.setAttribute('class', 'card')

            //Store COVID19 stats to display as a table (Convert to dictionnary where each label includes a type of colour)
            const table = document.createElement("table")
            selected_display_stats = {
                "Confirmed Cases": current_confirmed,
                "Confirmed Deaths": current_deaths,
                "Confirmed Active": current_active,
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
function processData(key,stats) {
    // Graphing data
    accumulated_active += stats[key].Active
    accumulated_confirmed += stats[key].Confirmed
    accumulated_deaths += stats[key].Deaths
    accumulated_recovered += stats[key].Date
    // Main data
    current_active = stats[key].Active
    current_confirmed = stats[key].Confirmed
    current_deaths = stats[key].Deaths
    current_timestamp = stats[key].Date
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
        //Format stats to HTML page
        if (key == 'Confirmed Cases') {
            cell.style.color = canadian_stats.confirmed[0]
            cell.style.fontSize = canadian_stats.confirmed[1]
        }
        if (key == 'Confirmed Deaths') {
            cell.style.color = canadian_stats.deaths[0]
            cell.style.fontSize = canadian_stats.deaths[1]
        }
        if (key == 'Confirmed Active') {
            cell.style.color = canadian_stats.active[0]
            cell.style.fontSize = canadian_stats.active[1]
        }
        if (key == 'Total Recovered') {
            cell.style.color = canadian_stats.recovered[0]
            cell.style.fontSize = canadian_stats.recovered[1]
        }
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

// Initialize variables
let valid_land = false
let total_active = 0
let total_confirmed = 0
let total_deaths = 0
let total_recovered = 0
let total_timestamp = ''

let current_active = 0
let current_confirmed = 0
let current_deaths = 0
let current_recovered = 0
let current_timestamp = ''

let accumulated_active = []
let accumulated_confirmed = []
let accumulated_deaths = []
let accumulated_recovered = []
let selected_display_stats = []