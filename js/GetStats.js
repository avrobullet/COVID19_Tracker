//COVID19 URL requests
covid19_urls = [
    'https://api.covid19api.com/country/canada/status/confirmed/live',  //Country-wide stats (frequent updates, but no recovered cases mentioned)
    'https://corona.lmao.ninja/v2/countries/Canada?yesterday&strict&query%20',  //Alternative Country-wide stats (frequent updates)
    'https://api.covid19api.com/live/country/canada/status/confirmed',   //Provincial stats (less frequent updates)
    'https://disease.sh/v2/gov/Canada' //Alternative provincial stats (only has cases and deaths, no recovered)
]
// Create functions
function getNationalStats() {
    //Get Canadian National COVID19 stats
    var request = new XMLHttpRequest()
    request.open('GET', covid19_urls[1], true)
    request.onload = function() {
        //Get COVID19 stats per
        var stats = JSON.parse(this.response)
        if (request.status >= 200 && request.status < 400) {
            //console.log(stats)
            displayStats(stats,false)
        } else {
            console.log('error')
        }
    }
    request.send()
}
function getProvinceStats() {
    //Get Canadian Provincial/Territory COVID19 stats
    var request = new XMLHttpRequest()
    request.open('GET', covid19_urls[2], true)
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
    //Post COVID19 National Stats (when card is False, that means only national stats are to be dislpayed)
    if (card == false) {
        //Get and display national stats
        processData(null,stats,null,false);
        calculateData(false);
        document.getElementById("national_cases").style.color = 'gold';
        document.getElementById("national_deaths").style.color = 'red';
        document.getElementById("national_recovered").style.color = 'green';
        document.getElementById("national_cases").innerHTML = canadian_stats_national.cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        document.getElementById("national_deaths").innerHTML = canadian_stats_national.deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        document.getElementById("national_recovered").innerHTML = canadian_stats_national.recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        document.getElementById("national_timestamp_update").innerHTML =
            "Stats Refreshed As Of " + getDate();
    }
    else {
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
            // Calculate provincial/national data
            calculateData(card,canadian_stats[area])

            // Only create COVID19 stats if currently selected province/territory is found
            if (valid_land == true) {
                //Post COVID19 stats onto 'cards' if true
                if (card == true)
                {
                    const card = document.createElement('div')
                    card.setAttribute('class', 'card')

                    //Store COVID19 stats to display as a table (Convert to dictionary where each label includes a type of colour)
                    const table = document.createElement("table")
                    selected_display_stats = {
                        "Cases": canadian_stats[area].confirmed,
                        "Deaths": canadian_stats[area].deaths,
                        "Active": canadian_stats[area].active
                    }

                    //Set information provinces/territories per card
                    createTable(table,selected_display_stats)
                    const h1 = document.createElement('h1')
                    h1.textContent = canadian_stats[area].province
                    const a = document.createElement('a')
                    a.href = canadian_stats[area].link
                    a.target = '_blank'

                    //Display content on each card
                    a.appendChild(h1)
                    a.appendChild(table)
                    card.appendChild(a)
                    container.appendChild(card)
                }
            }
            //Reset flag for found province/territory
            valid_land = false
        }
    }
}
function processData(key=None,stats,display_stats=None,card=None) {
    // Main national data
    if (card==false) {
        console.log(stats)
        accumulated_cases.push(stats.cases);
        accumulated_deaths.push(stats.deaths);
        accumulated_active.push(stats.active)
        accumulated_recovered.push(stats.recovered);
    }
    // Main provincial data
    else{
        display_stats.active = stats[key].Active.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        display_stats.deaths = stats[key].Deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        display_stats.confirmed = stats[key].Confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        display_stats.recovered = stats[key].Recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
}
function calculateData(card=None) {
    // Main national data
    if (card == false) {
        canadian_stats_national.cases += accumulated_cases.pop()
        canadian_stats_national.deaths += accumulated_deaths.pop()
        canadian_stats_national.active += accumulated_active.pop()
        canadian_stats_national.recovered += accumulated_recovered.pop()
    }
}
function getDate() {
    //Post latest COVID19 time stamp
    date = new Date();
    year = date.getFullYear()+'';
    //weekday = weekday[date.getDay()]+'';
    month = months[date.getMonth()]+'';
    return month.concat(' ',date.getDate(),', ', year);
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
        th.appendChild(data_header)
        cell.appendChild(data_value)
        head_row.appendChild(th)

        //Format stats to HTML page
        styleStats(key,cell)
        cell = document.createElement('td')
    }
}
function styleStats(key, set_style) {
    if (key == 'Cases' || key == 'Total Cases') {
        set_style.style.color = 'orange'
    }
    if (key == 'Deaths' || key == 'Total Deaths') {
        set_style.style.color = 'red'
    }
    if (key == 'Active' || key == 'Total Active') {
        set_style.style.color = 'blue'
    }
    if (key == 'Recovered' || key == 'Total Active'){
        set_style.style.color = 'green'
    }
}
function createApp() {
    // Initialize HTML elements
    const app = document.getElementById('root')
    container.setAttribute('class', 'container')
    app.appendChild(container)
    getNationalStats()
    getProvinceStats()
}

// Initialize variables
const container = document.createElement('div')

let valid_land = false
let confirmed_changed = false
let death_changed = false
let recovered_changed = false
let accumulated_deaths = []
let accumulated_recovered = []
let accumulated_cases = []
let accumulated_active = []
let selected_display_stats = []

//Start
createApp()