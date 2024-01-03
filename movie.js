console.log("123123");

const apiKey = '3b7f26c67cbc849c009b06c2dd22d7f3'

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  };
console.log(options.headers.Authorization)  
  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));


    //////////////////////////

async function movieSearch(){

}

