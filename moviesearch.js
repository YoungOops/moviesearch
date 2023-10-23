const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDQwZTIwNzJhYWY0MjM1ZjA4NmNmYjM4ODllZjU2OSIsInN1YiI6IjY1MmY2NTdjMGNiMzM1MTZmZWM5ZTc2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hcY72thbhWcl-T2PtLjZyBMRfyPjnf554i-7OEIiRUw'
    }
  };

  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
//fetch 함수를 사용 URL에서 데이터 가져옴 'top_rated' 목록 영화 정보를 영어로 받아옴 페이지 번호는 1페이지를 요청
// options은 fetch 요청에 대한 구성을 나타내는 변수로, 아마도 이전에 정의되었을 것으로 추측
    .then(response => response.json())
// 이 부분은 fetch 함수의 결과로 받아온 HTTP 응답을 JSON 형식으로 파싱하는 역할을 합니다.(파싱 구문분석)
// .then()은 프라미스 체인의 일부로서, 이전에 반환된 프라미스에 대한 처리를 나타냅니다.
    .then(response => {

        // console.log(response); //파싱 된 json 데이터 출력
        let results = response.results;//JSON 데이터에서 'results' 속성을 추출 ->'results' 변수에 할당이 속성은 영화 정보가 포함된 배열 가리킴
        results.forEach(data => {//'results' 각 배열 요소 반복 루프 'data' 변수로 참조 암튼 하는거
            createCard(data); //'createCard' 함수를 호출하여 'data'를 전달
            // 이 함수는 아마도 'data'를 사용하여 영화 정보 카드를 생성하는 역할을 할 것입니다.
        });
        // console.log(map);
        // // createCard(results[0]); // 리졀츠에 배열 0번째
    })
    .catch(err => console.error(err));3
    //catch 메서드-> then 메서드 체인에서 발생한 오류를 처리
    //console.error를 사용하여 오류 메시지를 콘솔에 출력

    const map = new Map(); //맵 선언함 Key값:title value값:card 넣을 것임

    const container= document.getElementById("cardContainer");
    //HTML에서 id가 "cardContainer"인 요소를 찾아서 container 변수에 할당
    //이 요소는 동적으로 생성된 카드를 포함하는 컨테이너 역할
    let createCard = (data) => { //createCard라는 함수를 정의 ->영화 데이터를 받아와서 카드를 생성하는 역할
        const card = document.createElement("div"); // 카드를 만들자
        card.classList.add("movieCard"); //클래스 리스트
        container.appendChild(card); // 컨테이너 만든 위치에 자식으로 카드를 넣는다. 

        const title = document.createElement("div"); // div 이놈은 html 여기서 쓰니까 암튼 말해주는 거임
        card.appendChild(title); // 타이틀은 카드에! 카드의 자식 타이틀 만든다.
        title.innerText = data.title;

        const image = document.createElement("img");// 이미지는 이렇게
        card.appendChild(image); // 얘도 카드에 ! 카드 안에 있는 자식 이미지 만든다.
        image.src = "https://image.tmdb.org/t/p/original/" + data.backdrop_path; //이게 key 값 데이터. 키값
        image.style.width = "380px";

        const info = document.createElement("div");
        card.appendChild(info); // 인포도 카드에! 카드 안에 있는 자식 인포 만든다
        info.innerText = data.overview; // 크롬에서 가져와야함 키 확인해서

        const voteAverage = document.createElement("div");
        card.appendChild(voteAverage); // 평점 카드에!
        voteAverage.innerText = data.vote_average; // 평점도 f12 에서 가져오기

        map.set(data.title, card); // 얘네를 묶어서 한 세트로 쳐준다.
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

        if(event.key==="Enter"){ // enter 대소문자 구분 없음
            search();
        }
    });