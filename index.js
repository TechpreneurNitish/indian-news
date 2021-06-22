console.log('Indian Express News');

// Initialize the news api parameters
let country = 'in';
let apiKey = 'f4e62a8004f143d0bd387b95a75c6e80'

// Grab the news container
let newsAccordion = document.getElementById('newsAccordion');

// Create an ajax get request

const xhr = new XMLHttpRequest();
xhr.open('GET', `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`, true);
xhr.getResponseHeader('Content-type', 'application/json');

// What to do when response is ready
xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        console.log(articles);
        let newsHtml = "";
        articles.forEach(function(element, index) {
            // console.log(element, index);
            let news = `<div class="card">
                            <div class="card-header" id="heading${index}">
                                <h2 class="mb-0">
                                    <button class="btn btn-link collapsed accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}"
                                        aria-expanded="false" aria-controls="collapse${index}">
                                        <b>Breaking News ${index+1}:</b> ${element["title"]}
                                    </button>
                                </h2>
                            </div>

                            <div id="collapse${index}" class="collapse accordion-collapse" aria-labelledby="heading${index}" data-bs-parent="#newsAccordion">
                                <div class="card-body"> ${element["content"]}. <a href="${element['url']}" target="_blank" >Read more here</a>  </div>
                            </div>
                        </div>`;
            newsHtml += news;
        });
        newsAccordion.innerHTML = newsHtml;
    }
    else {
        console.log("Some error occured");
    }
}

xhr.send();

