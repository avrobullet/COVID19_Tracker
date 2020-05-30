
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
    confirmed: 0,
    deaths: 0,
    recovered: 0
}
// Canadian Provinces and Territories stats (in no particular order)
// I should include an 'All' variable (i.e. all_deaths=[a,..,z])
canadian_stats = {
    alberta: {
        province: 'Alberta',
        confirmed: 0,
        active: 0,
        deaths: 0,
        recovered: 0 ,
        link: 'https://www2.gov.bc.ca/gov/content/safety/emergency-preparedness-response-recovery'},
    britishcolumbia: {
        province: 'British Columbia',
        confirmed: 0,
        active: 0,
        deaths: 0,
        recovered: 0 ,
        link: 'https://www2.gov.bc.ca/gov/content/safety/emergency-preparedness-response-recovery'},
    novascotia: {
        province: 'Nova Scotia',
        confirmed: 0,
        active: 0,
        deaths: 0,
        recovered: 0,
        link: 'https://www2.gov.bc.ca/gov/content/safety/emergency-preparedness-response-recovery'},
    quebec: {
        province: 'Quebec',
        confirmed: 0,
        active: 0,
        deaths: 0,
        recovered: 0,
        link: 'https://www2.gov.bc.ca/gov/content/safety/emergency-preparedness-response-recovery'},
    ontario: {
        province: 'Ontario',
        confirmed: 0,
        active: 0,
        deaths: 0,
        recovered: 0,
        link: 'https://www2.gov.bc.ca/gov/content/safety/emergency-preparedness-response-recovery'},
    newbrunswick: {
        province: 'New Brunswick',
        confirmed: 0,
        active: 0,
        deaths: 0,
        recovered: 0,
        link: 'https://www2.gov.bc.ca/gov/content/safety/emergency-preparedness-response-recovery'},
    manitoba: {
        province: 'Manitoba',
        confirmed: 0,
        active: 0,
        deaths: 0,
        recovered: 0,
        link: 'https://www2.gov.bc.ca/gov/content/safety/emergency-preparedness-response-recovery'},
    princeedwardisland: {
        province: 'Prince Edward Island',
        confirmed: 0,
        active: 0,
        deaths: 0,
        recovered: 0,
        link: 'https://www2.gov.bc.ca/gov/content/safety/emergency-preparedness-response-recovery'},
    saskatchewan: {
        province: 'Saskatchewan',
        confirmed: 0,
        active: 0,
        deaths: 0,
        recovered: 0,
        link: 'https://www2.gov.bc.ca/gov/content/safety/emergency-preparedness-response-recovery'},
    newfoudlandandlabrador: {
        province: 'Newfoundland and Labrador',
        confirmed: 0,
        active: 0,
        deaths: 0,
        recovered: 0,
        link: 'https://www2.gov.bc.ca/gov/content/safety/emergency-preparedness-response-recovery'},
    yukon: {
        province: 'Yukon',
        confirmed: 0,
        active: 0,
        deaths: 0,
        recovered: 0,
        link: 'https://www2.gov.bc.ca/gov/content/safety/emergency-preparedness-response-recovery'},
    nunavut: {
        province: 'Nunavut',
        confirmed: 0,
        active: 0,
        deaths: 0,
        recovered: 0,
        link: 'https://www2.gov.bc.ca/gov/content/safety/emergency-preparedness-response-recovery'},
    northwestterritories: {
        province: 'Northwest Territories',
        confirmed: 0,
        active: 0,
        deaths: 0,
        recovered: 0,
        link: 'https://www2.gov.bc.ca/gov/content/safety/emergency-preparedness-response-recovery'}
}