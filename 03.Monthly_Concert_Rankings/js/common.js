
// DOM 생성 후
document.addEventListener("DOMContentLoaded", function(){
    const html = document.querySelector("html");
    const header = document.querySelector("#header");
    const container = document.querySelector("#container");
    const footer = document.querySelector("#footer");

    const menuBtn = header.querySelector(".menu__btn");
    const layer = header.querySelector(".layer__wrap");
    const closeBtn = layer.querySelector(".close__btn");
    
    
    // 메뉴 열기
    menuBtn.addEventListener("click",function(event){
        event.stopPropagation();
        html.classList.add("scroll--hidden");
        layer.classList.add("active");
    });
    // 메뉴 닫기
    closeBtn.addEventListener("click",function(event){
        event.stopPropagation();
        initLayer();
    });

    // gnb 초기화
    function initLayer(){
        html.classList.remove("scroll--hidden");
        layer.classList.remove("active");
    };



    // 탭메뉴
    const tabBtns = document.querySelectorAll(".tab__list li");
    tabBtns.forEach(btn =>{
        btn.addEventListener("click",tabMenu);
    })
    function tabMenu(btn){
        const li = btn.target;
        const lists = [...li.parentElement.children];
        const index = lists.indexOf(li);
        const cardLists = document.querySelectorAll("#contents03 .card__list");

        lists.filter(item => item.classList.remove("on"));
        li.classList.add("on");

        cardLists.forEach((list,idx) =>{
            index == idx ? list.classList.add("on") : list.classList.remove("on");
        })
    };

    const con01ShortcutBtn = document.querySelector(".title__wrap .shortcut__btn");
    con01ShortcutBtn.addEventListener("click",function(){
        const contents03 = document.querySelector("#contents03");
        let sT;
        const pin = contents03.parentElement;
        const isPin = contents03.parentElement.classList.contains("pin-spacer"); //gsap 사용으로 .pin-spacer 찾기
        isPin ? sT = pin.offsetTop : sT = contents03.offsetTop;
        window.scrollTo({top:sT, behavior:"smooth"})
        
    });

    // contents04
    const contents04 = document.getElementById("contents04");
    const con04Cards =  document.querySelectorAll("#contents04 .card__list li");
    con04Cards.forEach((card,idx) => {
        card.addEventListener("click",function(){
            con04Cards.forEach(item => { if(this != item) item.classList.remove("active")});
            this.classList.toggle("active");
        });
    });
    

    // 영역 외 클릭 시 이벤트
    window.addEventListener("click", isTartget);
    function isTartget(evnet){
        const target = evnet.target;
        
        //gnb
        if(layer.classList.contains("active") && target !== layer.querySelector(".layer__inner") || !target.closest(".layer__inner")){
            initLayer();
        }
    };

});
