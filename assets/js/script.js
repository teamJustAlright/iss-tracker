var newsArticles = document.querySelector("#newsArticles")
var spaceArticles = document.querySelector('#spaceArticles')
var newsButton = document.querySelector('#newsButton')
var spaceNewsButton = document.querySelector('#spaceNewsButton')
var favoriteNewsButton = document.querySelector('#spaceNewsButton')
var allNewsButtons = document.querySelector('#allNewsButtons')
var goBackButton = document.querySelector('#goBackButton')

var sadURL = 'https://api.wheretheiss.at/v1/satellites/25544'
function fetchSatellites() {
    newsArticles.innerHTML = " ";
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
                                    .then(function (resNews) {
                                        console.log(resNews)
                                        return resNews.json();
                                    })
                                    .then(function (newsData) {
                                        console.log(newsData)
                                        for (var i = 0; i < newsData.value.length; i++) {
                                            console.log(newsData.value[i].name)
                                            var title = newsData.value[i].name;
                                            dispTitle = document.createElement('li')
                                            dispTitle.textContent = title
                                            var link = newsData.value[i].url
                                            var dispLink = document.createElement('a')
                                            var dispCheck = document.createElement('input')
                                            dispCheck.setAttribute('type', 'checkbox')
                                            dispLink.setAttribute('href', link)
                                            dispLink.setAttribute('target', "_blank")
                                            dispTitle.appendChild(dispCheck)
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
                                    .then(function (resNews) {
                                        console.log(resNews)
                                        return resNews.json();
                                    })
                                    .then(function (newsData) {
                                        console.log(newsData)
                                        for (var i = 0; i < newsData.value.length; i++) {
                                            console.log(newsData.value[i].name)
                                            var title = newsData.value[i].name;
                                            dispTitle = document.createElement('li')
                                            dispTitle.textContent = title
                                            var link = newsData.value[i].url
                                            var dispLink = document.createElement('a')
                                            var dispCheck = document.createElement('input')
                                            dispCheck.setAttribute('type', 'checkbox')
                                            dispLink.setAttribute('href', link)
                                            dispLink.setAttribute('target', "_blank")
                                            dispTitle.appendChild(dispCheck)
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
        .catch(function (err) {
            console.error(err);
        });
}
// function showing ISS location in map
// function pulling space news
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
        .then(function (response) {
            console.log(response)
            for (var i = 0; i < 10; i++) {
                console.log(response[i].url)
                var title = response[i].url;
                dispTitle = document.createElement('li')
                dispTitle.textContent = title
                var link = response[i].url
                var dispLink = document.createElement('a')
                var dispCheck = document.createElement('input')
                dispCheck.setAttribute('type', 'checkbox')
                dispLink.setAttribute('href', link)
                dispLink.setAttribute('target', "_blank")
                dispTitle.appendChild(dispCheck)
                dispLink.appendChild(dispTitle)
                spaceArticles.appendChild(dispLink)
            }
        })
        .catch(err => console.error(err));
}

function fetchLocation() {
    var latty  
    var long  

    fetch(sadURL)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            var latty = data.latitude
            var long = data.longitude
            console.log(latty)
            console.log(long)

            function initMap(latty, long) {
                var options = {
                    zoom: 4,
                    center: { lat: parseFloat(data.latitude), lng: parseFloat(data.longitude) }
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
            initMap();
            setInterval(function () {initMap();},5000);
        })
        .catch(function (err) {
            console.error(err);
        });
}
fetchLocation();


// function initMap(lat, long) {
//     var options = {
//         zoom: 8,
//         center: lat, long
//     }
//     var map = new google.maps.Map(document.getElementById("map"), options)
//     var marker = new google.maps.Marker({
//         position: lat, long,
//         map: map,
//     })
// }
//function resetHomePage() {
//allNewsButtons.classList.add('hide');
// goBackButton.classList.remove('hide');
//need to reset news articles too
//}

//goBackButton.addEventListener('click', resetHomePage);
newsButton.addEventListener('click', fetchSatellites);
spaceNewsButton.addEventListener('click', callSpaceNews);
