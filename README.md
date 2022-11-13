# ISS-Tracker

## Description

This application tracks the current location of the International Space Station and uses its location to generate locally relevant news articles. The application also pulls a series of news articles on space. This applicaiotn provides a nuanced way to get global news from around the world by using the ISS as a guide.  

## Usage

Monitor the current location of the ISS in the Google Maps window and use the "click here" buttons to generate news articles according to the current location of the ISS. Click the button on the left column to generate articles locally relevant to the ISS coordinates, click the middle button to generate articles on space news. To save an article to local storage, click its checkbox to add it to the right column. If you would like to see the saved the articles in the right column click see your saved articles. 


## User Story
```
AS A user
I WANT to see where the ISS is currently located.
SO I CAN read up on the current news articles from around the surrounding area. 
```

## Acceptance Criteria
```
GIVEN a website with Google Maps
WHEN an API is run to fetch the latitude and longitude of the ISS
THEN I am presented with the current location of the ISS on the map 
WHEN I view the current position of the ISS on maps
THEN I take the position and populate relevant news
WHEN I click on the news article buttons
THEN I can click on the articles to read in a new tab
WHEN I click checkbox articles will save in local storage
THEN when I click on see saved articles I can pull the articles I saved 
```


![screenshot of website with map and news article generation buttons](/assets/img/App-Screenshot.jpg)

URL: https://teamjustalright.github.io/iss-tracker/

## Credits

List your collaborators, if any, with links to their GitHub profiles.

mintedd: [https://github.com/mintedd]

jcgilbert70: [https://github.com/jcgilbert70]

genmla: [https://github.com/genmla]

API's Used:

Where the ISS at?: [https://wheretheiss.at/w/developer]

Bing News Search API: [https://www.microsoft.com/en-us/bing/apis/bing-news-search-api]

Space News API: [https://space-news.p.rapidapi.com/news]

## License

MIT License

---

test
