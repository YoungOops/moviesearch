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


const apiKey = "1d40e2072aaf4235f086cfb3889ef569";

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const movieList = document.getElementById("movieList");

searchButton.addEventListener("click", () => {
  const keyword = searchInput.value;
  searchMoviesByKeyword(keyword);
});

searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const keyword = searchInput.value;
    searchMoviesByKeyword(keyword);
  }
});

// 페이지 로딩 시 초기 영화 목록 표시
window.addEventListener("load", () => {
  initialMovieList();
});

function initialMovieList() {
  const initialKeyword = "The Godfather"; // 초기 검색어 설정
  searchMoviesByKeyword(initialKeyword);
}

function searchMoviesByKeyword(keyword) {
  movieList.innerHTML = "";

  fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=35`
  ) // 35는 코미디 장르의 ID입니다.
    .then((response) => response.json())
    .then((data) => {
      const movieList = data.results;

      // 3개의 영화 카드를 한 행으로 그룹화
      for (let i = 0; i < movieList.length; i += 3) {
        const movieGroup = movieList.slice(i, i + 3);
        createMovieRow(movieGroup);
      }
    })
    .catch((error) => {
      console.error("에러:", error);
    });
}

function createMovieRow(movieGroup) {
  const row = document.createElement("div");
  row.classList.add("movie-row");

  movieGroup.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    const title = document.createElement("div");
    title.classList.add("movie-title");
    title.innerText = movie.title;
    card.appendChild(title);

    const image = document.createElement("img");
    image.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
    card.appendChild(image);

    const overview = document.createElement("div");
    overview.classList.add("movie-overview");
    overview.innerText = movie.overview;
    card.appendChild(overview);

    card.addEventListener("click", () => {
      alert(`선택한 영화 ID: ${movie.id}`);
    });

    row.appendChild(card);
  });

  movieList.appendChild(row);
}