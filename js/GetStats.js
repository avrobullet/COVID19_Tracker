//COVID19 URL requests
covid19_urls = [
    'https://api.covid19api.com/country/canada/status/confirmed/live',  //Country-wide stats (more frequent updates)
    'https://api.covid19api.com/live/country/canada/status/confirmed'   //Provincial stats (less frequent updates)
]
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
                calculateData(card)
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
                document.getElementById("national_timestamp_update").innerHTML =
                    national_timespan_notification
                    + " as of "
                    + new_date;
                document.getElementById("national_cases").innerHTML
                    = canadian_stats_national.confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }

            //Post COVID19 stats onto 'cards' if true
            if (card == true)
            {
                //Display previously stats update
                document.getElementById("provincial/territory_timestamp_update").innerHTML =
                    province_timespan_notification
                    + " as of "
                    + new_date;

                const card = document.createElement('div')
                card.setAttribute('class', 'card')

                //Store COVID19 stats to display as a table (Convert to dictionary where each label includes a type of colour)
                const table = document.createElement("table")
                selected_display_stats = {
                    "Confirmed Cases": canadian_stats[area].confirmed,
                    "Confirmed Deaths": canadian_stats[area].deaths,
                    "Confirmed Active": canadian_stats[area].active,
                    "Total Recovered": canadian_stats[area].recovered
                }

                //Set provinces/territories per card
                createTable(table,selected_display_stats)
                const h1 = document.createElement('h1')
                h1.textContent = canadian_stats[area].province

                //Display content on each card
                container.appendChild(card)
                card.appendChild(h1)
                card.appendChild(table)
            }
        }
        //Reset flag for found province/territory
        valid_land = false
    }
}
function processData(key,stats,display_stats,card=None) {
    // Collected all of the date for each province
    //accumulated_active.push(stats[key].Active)
    //accumulated_confirmed.push(stats[key].Confirmed)
    //accumulated_deaths.push(stats[key].Deaths)
    //accumulated_recovered.push(stats[key].Date)

    // Main national data
    if (card==false) {
        accumulated_cases.push(stats[key].Cases)
        current_timestamp = stats[key].Date
    }
    // Main provincial data
    else{
        display_stats.active = stats[key].Active.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        display_stats.deaths = stats[key].Deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        display_stats.confirmed = stats[key].Confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        display_stats.recovered = stats[key].Recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        current_timestamp = stats[key].Date
    }
}
function calculateData(card=None) {
    // Main national data
    if (card == false) {
        canadian_stats_national.confirmed += accumulated_cases.pop()
        accumulated_cases.slice(0,accumulated_cases.length)
    }
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
function createApp() {
    // Initialize HTML elements
    const app = document.getElementById('root')
    container.setAttribute('class', 'container')
    app.appendChild(container)
    getNationalStats()
    getProvinceStats()
}

function testLinks(link) {
    console.log(link)
}

// Initialize variables
const container = document.createElement('a')

let valid_land = false
let total_recovered = 0

let current_confirmed = 0
let current_recovered = 0
let current_timestamp = ''

let accumulated_active = []
let accumulated_confirmed = []
let accumulated_deaths = []
let accumulated_recovered = []
let accumulated_cases = []
let selected_display_stats = []

let national_timespan_notification = 'Total Confirmed Cases'
let province_timespan_notification = 'Provincial and Territory Confirmed Cases '

//Start
createApp()