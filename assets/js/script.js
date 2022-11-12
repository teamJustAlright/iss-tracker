var currentArticles = [];
var allStoredArticles = [];

var newsArticles = document.querySelector("#newsArticles")
var spaceArticles = document.querySelector('#spaceArticles')
var favoriteArticles = document.querySelector('#favoriteArticles')
var newsButton = document.querySelector('#newsButton')
var spaceNewsButton = document.querySelector('#spaceNewsButton')
var clearListBtn = document.querySelector('#clearListBtn')
var allNewsButtons = document.querySelector('#allNewsButtons')
var showArticleBtn = document.querySelector('#showSaved')
var sadLat = document.querySelector('#sadLat')
var sadLong = document.querySelector('#sadLong')

var sadURL = 'https://api.wheretheiss.at/v1/satellites/25544'

//function getting lat and long of ISS
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
            //function getting local area according to lat and long of ISS
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
                        if (search.includes("GMT")) {
                            //function pulling articles on the ocean when ISS is not over land
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
                                            dispCheck.setAttribute('class', 'storageCheckbox')
                                            dispCheck.setAttribute('value', link)
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
                            //function pulling ariticles according to area below ISS
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
                                            dispCheck.setAttribute('class', 'storageCheckbox')
                                            dispCheck.setAttribute('value', link)
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
                dispCheck.setAttribute('class', 'checkboxx')
                dispCheck.setAttribute('class', 'storageCheckbox')
                dispCheck.setAttribute('value', link)
                dispLink.setAttribute('href', link)
                dispLink.setAttribute('target', "_blank")
                dispTitle.appendChild(dispCheck)
                dispLink.appendChild(dispTitle)
                spaceArticles.appendChild(dispLink)
            }
        })
        .catch(err => console.error(err));
}

// function showing ISS location in map every 5 seconds
function fetchLocation() {

    fetch(sadURL)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            function initMap() {
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
            sadLat.textContent = 'Latitude: ' + data.latitude.toFixed(5)
            sadLong.textContent = 'Longitude: ' + data.longitude.toFixed(5)
        })
        .catch(function (err) {
            console.error(err);
        });
}

// setInterval(fetchLocation, 5000);

//function clearing third column
function clearList () {
    favoriteArticles.innerHTML = " "
}

//event listeners
newsButton.addEventListener('click', fetchSatellites);
spaceNewsButton.addEventListener('click', callSpaceNews);
clearListBtn.addEventListener('click', clearList);

//appends checked articles to third column and removes them
spaceArticles.addEventListener('click', function (event) {
    var selectedArticle = event.target;
    if (selectedArticle.matches('input')) {
        var liArticle = document.createElement('li')
        liArticle.textContent = selectedArticle.parentElement.textContent
        dispURLArticle = document.createElement('a')
        var urlArticle = selectedArticle.value
        dispURLArticle.setAttribute('href', urlArticle)
        dispURLArticle.setAttribute('target', "_blank")
        dispURLArticle.appendChild(liArticle)
        favoriteArticles.appendChild(dispURLArticle)
        selectedArticle.parentElement.parentElement.removeChild(selectedArticle.parentElement)
    }

    var article = {
        urlArticle: urlArticle,
        title: selectedArticle,
    }
    currentArticles.push(article)
    localStorage.setItem('space news', JSON.stringify(currentArticles))

})

newsArticles.addEventListener('click', function (event) {
    var selectedArticle = event.target;
    if (selectedArticle.matches('input')) {
        var liArticle = document.createElement('li')
        liArticle.textContent = selectedArticle.parentElement.textContent
        dispURLArticle = document.createElement('a')
        var urlArticle = selectedArticle.value
        dispURLArticle.setAttribute('href', urlArticle)
        dispURLArticle.setAttribute('target', "_blank")
        dispURLArticle.appendChild(liArticle)
        favoriteArticles.appendChild(dispURLArticle)
        selectedArticle.parentElement.parentElement.removeChild(selectedArticle.parentElement)
    }

    var article = {
        urlArticle: urlArticle,
        selectedArticle: selectedArticle,
    }
    allStoredArticles.push(article)
    localStorage.setItem('space news', JSON.stringify(allStoredArticles))

})

function renderArticles (){
    // var selectedArticle = event.target;

    var spaceArticles = localStorage.getItem('space news')
    
    if (spaceArticles){
        currentArticles = JSON.parse(spaceArticles)
    }
    console.log(currentArticles)
    for (let i = 0; i < currentArticles.length; i++) {
        var element = currentArticles[i];
        var liArticle = document.createElement('li')
        dispURLArticle = document.createElement('a')
        var articleURL = element.urlArticle
        // var urlArticle = selectedArticle.value
        liArticle.textContent = articleURL
        // dispURLArticle.setAttribute('href', urlArticle)
        dispURLArticle.setAttribute('href', articleURL)
        dispURLArticle.setAttribute('target', "_blank")
        dispURLArticle.appendChild(liArticle)
        favoriteArticles.appendChild(dispURLArticle)
        // selectedArticle.parentElement.parentElement.removeChild(selectedArticle.parentElement)
    }
}


showArticleBtn.addEventListener('click', renderArticles)

