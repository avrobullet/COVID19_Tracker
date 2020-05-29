//COVID19 URL requests
covid19_urls = [
    'https://api.covid19api.com/country/canada/status/confirmed/live',  //Country-wide stats (more frequent updates)
    'https://api.covid19api.com/live/country/canada/status/confirmed'   //Provincial stats (less frequent updates)
]
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
// Canadian National stats
canadian_stats_national = {
    active: 0,
    deaths: 0,
    recovered: 0
}
// Canadian Provinces and Territories stats (in no particular order)
canadian_stats = {
    alberta:                { province: 'Alberta', confirmed: 0, active: 0, deaths: 0, recovered: 0 },
    britishcolumbia:        { province: 'British Columbia', confirmed: 0, active: 0, deaths: 0, recovered: 0 },
    novascotia:             { province: 'Nova Scotia', confirmed: 0, active: 0, deaths: 0, recovered: 0 },
    quebec:                 { province: 'Quebec', confirmed: 0, active: 0, deaths: 0, recovered: 0 },
    ontario:                { province: 'Ontario', confirmed: 0, active: 0, deaths: 0, recovered: 0 },
    newbrunswick:           { province: 'New Brunswick', confirmed: 0, active: 0, deaths: 0, recovered: 0 },
    manitoba:               { province: 'Manitoba', confirmed: 0, active: 0, deaths: 0, recovered: 0 },
    princeedwardisland:     { province: 'Prince Edward Island', confirmed: 0, active: 0, deaths: 0, recovered: 0 },
    saskatchewan:           { province: 'Saskatchewan', confirmed: 0, active: 0, deaths: 0, recovered: 0 },
    newfoudlandandlabrador: { province: 'Newfoundland and Labrador', confirmed: 0, active: 0, deaths: 0, recovered: 0 },
    yukon:                  { province: 'Yukon', confirmed: 0, active: 0, deaths: 0, recovered: 0 },
    nunavut:                { province: 'Nunavut', confirmed: 0, active: 0, deaths: 0, recovered: 0 },
    northwestterritories:   { province: 'Northwest Territories', confirmed: 0, active: 0, deaths: 0, recovered: 0 }
}
// HTML styles
stat_style = {
    active:     ['blue','25px'],
    confirmed:  ['orange','25px'],
    deaths:     ['red','25px'],
    recovered:  ['green','25px']
}
// Create functions
function getNationalStats() {

    //Get Canadian National COVID19 stats
    var request = new XMLHttpRequest()
    request.open('GET', covid19_urls[0], true)
    request.onload = function() {

        //Get COVID19 stats per
        var stats = JSON.parse(this.response)
        if (request.status >= 200 && request.status < 400) {
            //console.log(stats)
            displayStats(stats, false)
        } else {
            console.log('error')
        }
    }
    request.send()
}
function getProvinceStats() {
    //Get Canadian Provincial/Territory COVID19 stats
    var request = new XMLHttpRequest()
    request.open('GET', covid19_urls[1], true)
    request.onload = function() {
        //Get COVID19 stats per
        var stats = JSON.parse(this.response)
        if (request.status >= 200 && request.status < 400) {
            displayStats(stats, true)
        } else {
            console.log('error')
        }
    }
    request.send()
}
function displayStats(stats, card=None){
    //Collect COVID19 confirmed, deaths, and recoveries (COVID19 stats)
    for (let area in canadian_stats) {
        for (let key in stats) {
            // Process province's/territories' corresponding data
            if (canadian_stats[area].province.toLowerCase().trim() == stats[key].Province.toLowerCase().trim()) {
                valid_land = true
                current_province_key = key
                processData(key,stats,canadian_stats[area], card)
            }
        }

        // Only create COVID19 stats if currently selected province/territory is found
        if (valid_land == true) {
            //Post latest COVID19 time stamp
            [current_year, current_month, current_day] = current_timestamp.split('T')[0].split('-')
            year = current_year+''
            month = months[(parseInt(current_month))-1]+' '
            day = current_day+''
            let new_date = month.concat(day, ', ',year)

            //Post COVID19 stats onto 'cards' if true
            if (card == false) {
                //Set national stat displays
                document.getElementById("national_update").innerHTML = '';
                document.getElementById("national_stats").innerHTML = '';
                document.getElementById("national_timestamp_update").innerHTML = national_timespan_notification;
                document.getElementById("national_timestamp").innerHTML = new_date;
            }

            //Post COVID19 stats onto 'cards' if true
            if (card == true)
            {
                const card = document.createElement('div')
                card.setAttribute('class', 'card')

                //Store COVID19 stats to display as a table (Convert to dictionary where each label includes a type of colour)
                const table = document.createElement("table")
                selected_display_stats = {
                    "Confirmed Cases": canadian_stats[area].confirmed,
                    "Confirmed Deaths": canadian_stats[area].deaths,
                    "Confirmed Active": canadian_stats[area].active,
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

                //Display previously stats update
                document.getElementById("provincial/territory_timestamp_update").innerHTML = province_timespan_notification
                document.getElementById("provincial/territory_timestamp").innerHTML = new_date;
            }
        }
        //Reset flag for found province/territory
        valid_land = false
    }
}
function processData(key,stats,display_stats) {
    // Graphing data
    accumulated_active.push(stats[key].Active)
    accumulated_confirmed.push(stats[key].Confirmed)
    accumulated_deaths.push(stats[key].Deaths)
    accumulated_recovered.push(stats[key].Date)

    // Main national data
    total_active = 0
    total_confirmed = 0
    total_deaths = 0

    // Main provincial data
    display_stats.active = stats[key].Active
    display_stats.confirmed = stats[key].Confirmed
    display_stats.deaths = stats[key].Deaths
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
        let th = document.createElement("th")
        let data_value = document.createTextNode(data[key])
        let data_header = document.createTextNode(key)
        cell.appendChild(data_value)
        th.appendChild(data_header)
        head_row.appendChild(th)

        //Format stats to HTML page
        cell = styleStats(key,cell)
        cell.style.fontWeight = 'bold';
        cell.style.textAlign = 'center';
        cell.style.padding = '5px';
    }
}
function styleStats(key, set_style) {
    if (key == 'Confirmed Cases' || key == 'Total Cases') {
        set_style.style.color = stat_style.confirmed[0]
        set_style.style.fontSize = stat_style.confirmed[1]
    }
    if (key == 'Confirmed Deaths' || key == 'Total Deaths') {
        set_style.style.color = stat_style.deaths[0]
        set_style.style.fontSize = stat_style.deaths[1]
    }
    if (key == 'Confirmed Active' || key == 'Total Active') {
        set_style.style.color = stat_style.active[0]
        set_style.style.fontSize = stat_style.active[1]
    }
    if (key == 'Total Recovered') {
        set_style.style.color = stat_style.recovered[0]
        set_style.style.fontSize = stat_style.recovered[1]
    }
    return set_style
}
// Initialize HTML elements
const app = document.getElementById('root')
const container = document.createElement('div')
container.setAttribute('class', 'container')
app.appendChild(container)
getNationalStats()
getProvinceStats()

// Initialize variables
let valid_land = false
let total_active = 0
let total_confirmed = 0
let total_deaths = 0
let total_recovered = 0
let total_timestamp = ''

let current_recovered = 0
let current_timestamp = ''

let accumulated_active = []
let accumulated_confirmed = []
let accumulated_deaths = []
let accumulated_recovered = []
let selected_display_stats = []

let national_timespan_notification = 'Current National Stats: '
let province_timespan_notification = 'Current Provincial/Territory Stats: '