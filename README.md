# COVID19 Tracker

A web-based [Canadian COVID19 dashboard](http://coviddashboard.ca/) built completely from scratch to allow the viewer to quickly glance at meaningful statistics. This project uses HTML5, CSS3, JavaScript, PHP, and Wordpress.

## Contents
- [Software Tools Used](#software-tools-used)
- [Version](#version)
- [Current Problems and Issues](#current-problems-and-issues)
- [License](#license)

## Software Tools Used
- [Google Cloud Platfom](https://cloud.google.com/gcp/?utm_source=google&utm_medium=cpc&utm_campaign=2015-q2-cloud-na-gcp-%20bkws-freetrial-en&&gclid=Cj0KCQjw9IX4BRCcARIsAOD2OB2QYuE2sy-51ZvztnN0TZzz7rhi5Qxksp4yKoRFMZT6_Dvlm01YXmAaAvJ4EALw_wcB) - Using Google Cloud to host the website
- [Wordpress](https://wordpress.com/) - The website publishing service
- HTML5, CSS3, JavaScript - The programming languagues used to create the website itself

## Version

Currently, my wesbite does not contain any graphing or other visualisation indicatiors to help individuals understand the progression of COVID19 cases. Such key features will be added in __Version 0.2__.

### Current Version: 0.1
- Individual cards that represent their respective provinces and terriroties are now clickable links to official government online sources, respectively.
- Updated with additional screen resolutions to allow for statisticcal data to be porperly displayed based.
- Replaced national statistics with a more credible API source receives more frequent updates

## Current Problems and Issues
I have access to a couple of APIs to Canadian COVID19 data is required for updating live cases, however the API used for provincial statistics has stopped updating since the end of May. Currently, there are no API alternatives that show individual provincial statistics and differentiate between cases that are active, fatal, and recovered. I may have to restructure the website entirely to display national case data.

## License
This project is licensed under the Apache 2 License - see the LICENSE file for details
