
var newsArticles = document.querySelector("#newsArticles")

var sadURL = 'https://api.wheretheiss.at/v1/satellites/25544'
function fetchSatellites() {
    fetch(sadURL)
        .then(function (res) {
            console.log(res)
            return res.json();
        })
        .then(function (data) {
            console.log(data)
            var lat = data.latitude
            var long = data.longitude
            console.log(lat)
            console.log(long)

            function fetchCoordinates() {
                var coordURL = "https://api.wheretheiss.at/v1/coordinates/" + lat + "," + long
                fetch(coordURL)
                    .then(function (resCoord) {
                        console.log(resCoord)
                        return resCoord.json();
                    })
                    .then(function (dataCoord) {
                        console.log(dataCoord)
                        var search = dataCoord.timezone_id
                        console.log(search)
                        //get news from iss coordinates api
                        if (search.includes("GMT")) {
                            function fetchOceanNews() {
                                const options = {
                                    method: 'GET',
                                    headers: {
                                        'X-BingApis-SDK': 'true',
                                        'X-RapidAPI-Key': '50cc2d0454msh791cfc507cb9edcp1bb448jsn9d24f68a8d93',
                                        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
                                    }
                                };
                                fetch('https://bing-news-search1.p.rapidapi.com/news/search?q=ocean&safeSearch=Off&textFormat=Raw&freshness=Day', options)
                                    .then (function (resNews) {
                                        console.log(resNews)
                                        return resNews.json();
                                    })
                                    .then (function (newsData) {
                                        console.log(newsData)
                                        for (var i=0; i < newsData.value.length; i++) {
                                            console.log(newsData.value[i].name)
                                            var title = newsData.value[i].name;
                                            dispTitle = document.createElement('li')
                                            dispTitle.textContent = title
                                            var link = newsData.value[i].url
                                            var dispLink = document.createElement('a')
                                            dispLink.setAttribute('href', link)
                                            dispLink.appendChild(dispTitle)
                                            newsArticles.appendChild(dispLink)
                                        } 
                                    })    
                            }
                            fetchOceanNews() 
                        }
                        else {
                            function fetchNews() {
                                const options = {
                                    method: 'GET',
                                    headers: {
                                        'X-BingApis-SDK': 'true',
                                        'X-RapidAPI-Key': '50cc2d0454msh791cfc507cb9edcp1bb448jsn9d24f68a8d93',
                                        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
                                    }
                                };
                                fetch('https://bing-news-search1.p.rapidapi.com/news/search?q=' + search + '&safeSearch=Off&textFormat=Raw&freshness=Day', options)
                                    .then (function (resNews) {
                                        console.log(resNews)
                                        return resNews.json();
                                    })
                                    .then (function (newsData) {
                                        console.log(newsData)
                                        for (var i=0; i < newsData.value.length; i++) {
                                            console.log(newsData.value[i].name)
                                            var title = newsData.value[i].name;
                                            dispTitle = document.createElement('li')
                                            dispTitle.textContent = title
                                            var link = newsData.value[i].url
                                            var dispLink = document.createElement('a')
                                            dispLink.setAttribute('href', link)
                                            dispLink.appendChild(dispTitle)
                                            newsArticles.appendChild(dispLink)
                                        } 
                                    })    
                            }
                            fetchNews()
                        }
                    })    
            }
            fetchCoordinates();
        })
    .catch(function(err){
        console.error(err);
    });
}

fetchSatellites();
