var currentArticles = [];
var allStoredArticles = [];

var newsArticles = document.querySelector("#newsArticles")
var spaceArticles = document.querySelector('#spaceArticles')
var favoriteArticles = document.querySelector('#favoriteArticles')
var newsButton = document.querySelector('#newsButton')
var spaceNewsButton = document.querySelector('#spaceNewsButton')
var favoriteNewsButton = document.querySelector('#favoriteNewsButton')
var allNewsButtons = document.querySelector('#allNewsButtons')
var goBackButton = document.querySelector('#goBackButton')
var saveArticleBtn = document.querySelector('#saveArticleBtn')

var sadURL = 'https://api.wheretheiss.at/v1/satellites/25544'

function init() {
    if (localStorage.getItem('storedArticle') == null || []) {
        localStorage.setItem('storedArticle', '[]');
        console.log('localStorage is empty')
    }
    if (localStorage.getItem('currentArticle') == null || []) {
        localStorage.setItem('currentArticle', '[]');
        console.log('localStorage is empty')
    }

}


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
                                            dispCheck.setAttribute('class', 'checkboxx')
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
                                            dispCheck.setAttribute('class', 'checkboxx')
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

                // store checkboxed articles to array
                $('.storageCheckbox').on('click', function () {
                    var pushVal = $(this).val();
                    console.log(pushVal)
                    if ($(this).is(':checked')) {
                        currentArticles.push(pushVal);
                        // removes multiples of same articles created by dynamic for loop that populated the articles
                        currentArticles = [... new Set(currentArticles)];
                        localStorage.setItem('currentArticle', JSON.stringify(currentArticles));
                    } else {
                        currentArticles.pop();
                        localStorage.removeItem('currentArticle', JSON.stringify(pushVal));
                    }
                    console.log("current articles: " + currentArticles + '\n Current article: ' + localStorage.getItem('currentArticle'))
                })
            }
        })
        .catch(err => console.error(err));
}


function showStoredArticles(event) {
    event.preventDefault();
    console.log("show stored articles function ran")

    //if no local storage, leave blank array
    if ((localStorage.getItem('storedArticle') === '[]') && (localStorage.getItem('currentArticle') === '[]')) {
        localStorage.setItem('storedArticle', '[]');
        console.log('localStorage is empty')
        return
    }

    // get stored articles and add current articles

    allStoredArticles = JSON.parse(localStorage.getItem('storedArticle'));
    if (currentArticles === null) {
        return

    } else {
        allStoredArticles.push(currentArticles);

        // save stored & current data
        localStorage.setItem('storedArticle', JSON.stringify(allStoredArticles));

        allStoredArticles = [... new Set(allStoredArticles)];
        console.log(allStoredArticles)

        if (localStorage.getItem('storedArticle') != null) {


            for (var i = 0; i < allStoredArticles.length; i++) {

                var title = allStoredArticles[i];
                var dispTitle = document.createElement('li')
                dispTitle.textContent = title
                var dispLink = document.createElement('a')
                var dispCheck = document.createElement('input')
                dispCheck.setAttribute('type', 'checkbox')
                dispCheck.setAttribute('class', 'checkboxx')
                dispCheck.setAttribute('class', 'favoriteCheckbox')
                dispCheck.setAttribute('value', title)
                dispLink.setAttribute('href', title)
                dispLink.setAttribute('target', "_blank")
                dispTitle.appendChild(dispCheck)
                dispLink.appendChild(dispTitle)
                favoriteArticles.appendChild(dispLink)
            }

        }

    }
}

// function showing ISS location in map
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
        })
        .catch(function (err) {
            console.error(err);
        });
}

// setInterval(fetchLocation, 5000);

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

init();

//goBackButton.addEventListener('click', resetHomePage);
favoriteNewsButton.addEventListener('click', showStoredArticles);
newsButton.addEventListener('click', fetchSatellites);
spaceNewsButton.addEventListener('click', callSpaceNews);


var favoriteArticleLi = function (event) {
    var selectedArticle = event.target;
    var checkbox = document.querySelector('.checkboxx').checked
    if (checkbox) {
        var liArticle = document.createElement('li')
        liArticle.textContent = selectedArticle.parentElement.textContent
        dispURLArticle = document.createElement('a')
        var urlArticle = selectedArticle.value
        dispURLArticle.setAttribute('href', urlArticle)
        dispURLArticle.setAttribute('target', "_blank")
        dispURLArticle.appendChild(liArticle)
        favoriteArticles.appendChild(dispURLArticle)
    }
    else if(!checkbox) {
        liArticle = ''
    }
    else 
        return
        
}

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
})

newsArticles.addEventListener('change', favoriteArticleLi)

var saveArticles = function(e){
        localStorage.setItem("checkbox", checkbox.checked);	
    
    //for loading
    var checked = JSON.parse(localStorage.getItem("checkbox"));
        document.querySelector(".checkboxx").checked = checked;

}

saveArticleBtn.addEventListener('click', saveArticles)