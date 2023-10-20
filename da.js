// const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OWFhNTcxMjUwMjAwZGFkZmQyNGIzYmQyNGMzNzU1ZiIsInN1YiI6IjY1MmY0NDk0ZWE4NGM3MDBhZWY0YWQxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z0256uYeUXzk9kL0zAHc4r9nsqgTAcZa3Kw5tXUX7Ek'
//     }
//   };

//   fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
//     .then(response => response.json())
//     .then(response => {
  
//       //  console.log(response); 
//        getResults(response);
  
//       })
//     .catch(err => console.error(err));
  
//     // 결과 전체
//     function getResults(response) {
//       let results = response.results;
//       // console.log(response.results);
//       results.forEach(e => {
//           getMovie(e);
//       });
  
//       // for(let i = 0; i<results.length; i++) {
//       //     getMovie(results[i]);
//       // }
      
//       // getMovie(results[0]);
//     }
  
//     // 영화 하나의 데이타 출력
//     function getMovie(data) {
//       const container = document.getElementById("movie-container");
  
//       console.log(data);
  
//       const card = document.createElement("div");
//       card.classList.add("movie-card");
  
//       const title = document.createElement("div");
//       title.classList.add("movie-title");
//       title.innerText = data.original_title;
//       card.appendChild(title);
  
//       const image = document.createElement("img");
//       image.style.width = "300px";
//       image.src = "https://image.tmdb.org/t/p/original/" + data.poster_path;
//       card.appendChild(image);
  
//       const info = document.createElement("div");
//       card.appendChild(info);
//       info.innerText = data.overview;
  
//       container.appendChild(card);
//     }