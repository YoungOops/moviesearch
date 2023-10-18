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

    // API를 호출할 때 사용할 영화 데이터 서비스의 API 키를 설정
const apiKey = "1d40e2072aaf4235f086cfb3889ef569";

    // HTML 요소 가져오기
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const movieList = document.getElementById("movieList");

   // 검색 버튼 클릭 이벤트 리스너 추가
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
  // 초기화면에는 검색어를 비워 놓습니다.
  searchMoviesByKeyword("");
});

 // 키워드로 영화 검색 및 표시
function searchMoviesByKeyword(keyword) {
  movieList.innerHTML = "";

  if (keyword.trim() === "") {
    // 키워드가 공백일 경우 코미디 영화를 표시
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=35`
    )// 35는 코미디 장르의 ID입니다.
      .then((response) => response.json())
      .then((data) => {
        const movieList = data.results;
        for (let i = 0; i < movieList.length; i += 3) {
          const movieGroup = movieList.slice(i, i + 3);
          createMovieRow(movieGroup);
        }
      })
      .catch((error) => {
        console.error("에러:", error);
      });
  } else {
    // 검색어를 사용하여 영화 검색
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${keyword}`
    )
      .then((response) => response.json())
      .then((data) => {
        const movieList = data.results;
        for (let i = 0; i < movieList.length; i += 3) {
          const movieGroup = movieList.slice(i, i + 3);
          createMovieRow(movieGroup);
        }
      })
      .catch((error) => {
        console.error("에러:", error);
      });
  }
}

    // 영화 카드 생성 및 표시 함수
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