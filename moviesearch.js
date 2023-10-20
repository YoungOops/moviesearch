const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDQwZTIwNzJhYWY0MjM1ZjA4NmNmYjM4ODllZjU2OSIsInN1YiI6IjY1MmY2NTdjMGNiMzM1MTZmZWM5ZTc2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hcY72thbhWcl-T2PtLjZyBMRfyPjnf554i-7OEIiRUw'
    }
  };
  
  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => {
        console.log(response);
        let results = response.results;
        results.forEach(data => {//배열 요소 하나하나 돌면서 배열 요소 -> data 암튼 하는거
            createCard(data);
        });
        console.log(map);
        // createCard(results[0]); // 리졀츠에 배열 0번째
    })
    .catch(err => console.error(err));3

    const map = new Map(); //맵 선언함 타이틀 키값 밸류는 카드를 넣을 것임

    const container= document.getElementById("cardContainer");
    let createCard = (data) => {
        const card = document.createElement("div");
        container.appendChild(card); //컨테이너 만든 위치에 자식으로 카드를 넣는다. 
        
        const title = document.createElement("div");
        card.appendChild(title); // 타이틀은 카드에!
        title.innerText = data.title;

        const image = document.createElement("img");// 이미지는 이렇게
        card.appendChild(image); // 얘도 카드에 !
        image.src = "https://image.tmdb.org/t/p/original/" + data.backdrop_path; //이게 key 값 데이터. 키값
        image.style.width = "300px";

        const info = document.createElement("div");
        card.appendChild(info); // 인포도 카드에!
        info.innerText = data.overview; // 크롬에서 가져와야함 키 확인해서

        const voteAverage = document.createElement("div");
        card.appendChild(voteAverage); // 평점 카드에!
        voteAverage.innerText = data.vote_average; // 평점도 f12 에서 가져오기

        map.set(data.title, card);
        const id = data.id;
        card.addEventListener("click",()=>{
            alert(id);
        });
    }

    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");

    let search =()=>{
        for(const title of map.keys()) {
            if(title.toUpperCase().includes(searchInput.value.toUpperCase())){
                map.get(title).style.display = 'block'

            }
            else {
                map.get(title).style.display = 'none';
    
            }
    
        }
    }
    searchButton.addEventListener("click",()=>{
        search();
    });

    searchInput.focus(); //커서 깜빡깜빡거리게

    searchInput.addEventListener("keyup",(event)=>{
        
        if(event.key==="enter"){ // enter 대소문자 구분 없음
            search();
        }
    });
