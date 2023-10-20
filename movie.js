// 내배캠에서 시킨 것
// const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDQwZTIwNzJhYWY0MjM1ZjA4NmNmYjM4ODllZjU2OSIsInN1YiI6IjY1MmY2NTdjMGNiMzM1MTZmZWM5ZTc2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hcY72thbhWcl-T2PtLjZyBMRfyPjnf554i-7OEIiRUw'
//     }
//   };

// API 키 및 필요한 요소들을 변수로 저장
const apiKey = "1d40e2072aaf4235f086cfb3889ef569";
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const movieList = document.getElementById("movieList");

// 검색 버튼 클릭 이벤트 리스너
searchButton.addEventListener("click", () => {
  const keyword = searchInput.value;
  searchMoviesByKeyword(keyword);
});

// Enter 키 입력 시 검색 이벤트 처리
searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const keyword = searchInput.value;
    searchMoviesByKeyword(keyword);
  }
});

// 페이지 로드 시 초기 영화 목록을 표시
window.addEventListener("load", () => {
  // 초기화면에는 검색어를 비워서 코미디 장르의 영화를 표시합니다.
  searchMoviesByKeyword("");
});

// 키워드에 따라 영화 검색 및 목록 생성
function searchMoviesByKeyword(keyword) {
  movieList.innerHTML = "";

  if (keyword.trim() === "") {
    // 키워드가 공백일 경우 코미디 영화를 표시
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=35`
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

// 영화 그룹을 포함한 행 생성
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

    // 영화 카드 클릭 시 영화 ID를 알림으로 표시
    card.addEventListener("click", () => {
      alert(`선택한 영화 ID: ${movie.id}`);
    });

    row.appendChild(card);
  });

  movieList.appendChild(row);
}
