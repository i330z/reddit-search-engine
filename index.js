import redditApi from './redditsearch';

const searchForm = document.getElementById('search-form');
const searchFilter =document.getElementById('search-input');

searchForm.addEventListener('submit', e =>{
    e.preventDefault();

    const searchValue = searchFilter.value;
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    const searchLimit = document.getElementById('limit').value;
    console.log(sortBy)
    console.log(searchLimit);
    redditApi.search(searchValue,sortBy,searchLimit)
    .then(result =>{
        let output = '<div class="card-columns">'
        result.forEach(post => {
            console.log(post)

            let image = post.preview ? post.preview.images[0].source.url : './dist/reddit.jpeg';

            output += `<div class="card"">
            <img class="card-img-top" src="${image}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${post.selftext}</p>
              <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a><hr>
              <span class="badge badge-secondary">Subreddit:${post.subreddit}</span>  
              <span class="badge badge-secondary">Score:${post.score}</span>  
            </div>
          </div>`
        });
        output += '</div>'
        document.getElementById('results').innerHTML = output;
    })

    if(searchValue === ''){
        showMessage('Enter In the Search Field','alert-danger')
    }

    function showMessage(message, classname){
        const div = document.createElement('div');
        div.className = `alert ${classname}`;
        div.textContent = message;
        // div.appendChild(document.createTextNode(message));

        const searchContianer = document.getElementById('search-container');
        const search = document.getElementById('search');

        searchContianer.insertBefore(div,search);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    
})