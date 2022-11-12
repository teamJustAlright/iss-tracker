var newsArticles = document.querySelector("#newsArticles")
var spaceArticles = document.querySelector('#spaceArticles')
var favoriteArticles = document.querySelector('#favoriteArticles')
var newsButton = document.querySelector('#newsButton')
var spaceNewsButton = document.querySelector('#spaceNewsButton')
var favoriteNewsButton = document.querySelector('#favoriteNewsButton')
var allNewsButtons = document.querySelector('#allNewsButtons')
var goBackButton = document.querySelector('#goBackButton')
var saveArticleBtn = document.querySelector('#saveArticleBtn')


var fetchSatellites = function () {
    var sadURL = 'https://api.wheretheiss.at/v1/satellites/25544'

    newsArticles, innerHTML = ''
    fetch(sadURL)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            // var lat = data.latitude
            // var long = data.longitude
            console.log(data)
            // console.log(latitude)
            // console.log(longitude)


            if (!data[0]) {
                return
            } else {
                (fetchCoordinates(data[0]));
                (initMap(data));
            }
        })
        .catch(function (err) {
            console.log(err)
        })
}

 function fetchCoordinates(location) { //somehow this gives me lat but not long
    var { latitude, longitude } = location
    console.log(data)
    //how do i get the previous lat and long when it is local to the previous function
    var coordURL = `https://api.wheretheiss.at/v1/coordinates/${latitude}${longitude }`
    fetch(coordURL)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data)
            var search = data.timezone_id
            console.log(search)

            if (!search.includes('GMT')) {
                return
            } else {
                fetchOceanNews()
            }

        })
        .catch(function (err) {
            console.log(err)
        })
}

var fetchOceanNews = function () {
    const options = {
        method: 'GET',
        headers: {
            'X-BingApis-SDK': 'true',
            'X-RapidAPI-Key': '50cc2d0454msh791cfc507cb9edcp1bb448jsn9d24f68a8d93',
            'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
        }
    };
    fetch('https://bing-news-search1.p.rapidapi.com/news/search?q=ocean&safeSearch=Off&textFormat=Raw&freshness=Day', options)
        .then(function (resNews) {
            console.log(resNews)
            return resNews.json();
        })
        .then(function (data) {
            // this needs to be the function that does the for loop - invokes here not defined here
            if (!data) {
                return
            } else {
                articleEl(data);
            }

        })
        .catch(function (err) {
            console.log(err)
        })
}

var callSpaceNews = function () {
    spaceArticles.innerHTML = " ";
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2759920b31msh08d8d088f8ba9a9p1da747jsnd9c3fd556b03',
            'X-RapidAPI-Host': 'space-news.p.rapidapi.com'
        }
    };

    fetch('https://space-news.p.rapidapi.com/news', options)
        .then(function (response) {
            return response.json();
        })
        .then(function (newsData) {
            console.log(newsData)
            if (!newsData) {
                return
            } else {
                articleEl(newsData);
            }
        })
        .catch(function (err) {
            console.error(err);
        });
}

var articleEl = function (newsData) {
    var newsArt = document.getElementById('newsArticles')

    for (var i = 0; i < newsData.value.length; i++) {
        console.log(newsData.value[i].name)
        var title = newsData.value[i].name;
        dispTitle = document.createElement('li')
        dispTitle.textContent = title
        var link = newsData.value[i].url
        var dispLink = document.createElement('a')
        var dispCheck = document.createElement('input')
        dispCheck.setAttribute('type', 'checkbox')
        dispCheck.setAttribute('class', 'checkboxx')
        dispLink.setAttribute('href', link)
        dispLink.setAttribute('target', "_blank")
        dispTitle.appendChild(dispCheck)
        dispLink.appendChild(dispTitle)
        newsArticles.appendChild(dispLink)
    }
}

function initMap(location) {
    var {latitude, longitude} = location
    var options = { 
        zoom: 4,
        center: { lat: parseFloat${latitude}, lng: parseFloat${longitude} }
    }
    var map = new google.maps.Map(document.getElementById("map"), options)
    var marker = new google.maps.Marker({
        position: { lat: parseFloat(data.latitude), lng: parseFloat(data.longitude) },
        map: map,
        icon: {
            url: 'satellite-svgrepo-com.svg',
            scaledSize: new google.maps.Size(50, 50)
        }
    })
}



newsButton.addEventListener('click', fetchSatellites);
spaceNewsButton.addEventListener('click', callSpaceNews);