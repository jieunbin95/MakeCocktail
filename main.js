let lists = [];
let url = "";
let page = 1;


let fetchUrl = async () => {
  try {
    url.searchParams.set('page',page)
    console.log('url은',url)

    let response = await fetch(url);
    let data = await response.json();

    lists = data.drinks;
    console.log(data);

    render();
    
  } catch (error) {
    errorsRender("There are no matching search results.");
    console.log('에러는',error.message)
  }
};

let cocktail = async () => {
  url = new URL(
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita&page_size=4"
  );

  fetchUrl();
};

//카테고리
let listMenus = document.querySelectorAll(".list button");
let underLine = document.querySelector(".underline");

listMenus.forEach((list) => {
  list.addEventListener("click", (event) => menus(event));
});

const menus = async (event) => {
  if (event) {
    underLine.style.left = event.currentTarget.offsetLeft + "px";
    underLine.style.width = event.currentTarget.offsetWidth + "px";
    underLine.style.top =
      event.currentTarget.offsetTop + event.currentTarget.offsetHight + "px";
  }

  let menusText = event.target.textContent;
  console.log("클릭", event.target.textContent);

  url = new URL(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${menusText}&page_size=4`
  );

  fetchUrl();
};

//검색창
let searchInput = document.querySelector(".search-input");
let goBtn = document.querySelector(".go-btn");

const searchContext = async () => {
  let searchText = searchInput.value;
  console.log(searchText);

  url = new URL(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}&page_size=4`
  );

  fetchUrl();
};

goBtn.addEventListener("click", searchContext);

//ul작업
const render = () => {
  let resultHTML = "";

  resultHTML = lists
    .map((list) => {
      return `<div class="main-img">
      <img
        src="${list.strDrinkThumb}"
      />
  </div>

  <div class="recipe">
    <div class="name">${list.strDrink}</div>
    <div class="text">${list.strInstructions || "No content"} </div>
  </div>`;
    })
    .join("");

  document.querySelector(".main-page").innerHTML = resultHTML;
};

const errorsRender = (message) => {
  let errorHTML = `<div class="alert alert-primary border border-white" role="alert">
  ${message}
  </div>`;

  document.querySelector(".main-page").innerHTML = errorHTML;
};



// 페이지네이션만들기



cocktail();

//검색창버튼을 누르면 search-input나오기
let search = document.querySelector(".search .material-symbols-outlined");
let searchInputBtn = document.querySelector(".search-input-btn");
let btn = false;

inputBtn = () => {
  btn = !btn;
  if (btn === true) {
    searchInputBtn.classList.add("showInput");
  } else {
    searchInputBtn.classList.remove("showInput");
  }
};

search.addEventListener("click", inputBtn);

//메뉴창을 누르면 메뉴바 나오기
let subMenu = document.querySelector(".sub-menu .material-symbols-outlined");
let subBtn = document.querySelector(".sub-btn");
let closeBtn = document.querySelector(".close");

showMenu = () => {
  subBtn.classList.add("showBtn");
};

goneMenu = () => {
  subBtn.classList.remove("showBtn");
};

subMenu.addEventListener("click", showMenu);
closeBtn.addEventListener("click", goneMenu);
