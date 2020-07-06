# COVID19 Tracker

## Introduction
A web-based [Canadian COVID19 dashboard](http://coviddashboard.ca/) built completely from scratch to allow the viewer to quickly glance at meaningful statistics.

## Current Problems and Issues
I have access to a couple of APIs to Canadian COVID19 data is required for updating live cases, however the API used for provincial statistics has stopped updating since the end of May. Currently, there are no API alternatives that show individual provincial statistics and differentiate between cases that are active, fatal, and recovered. I may have to restructure the website entirely to display national case data.

## Builds

Currently, my wesbite does not contain any graphing or other visualisation indicatiors to help individuals understand the progression of COVID19 cases. Such key features will be added in __Build 0.2__.

### Current Build: 0.1
- Individual cards that represent their respective provinces and terriroties are now clickable links to official government online sources, respectively.
- Updated with additional screen resolutions to allow for statisticcal data to be porperly displayed based.
- Replaced national statistics with a more credible API source receives more frequent updates
