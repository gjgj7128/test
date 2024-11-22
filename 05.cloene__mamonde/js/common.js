document.addEventListener("DOMContentLoaded", function(){
    const html = document.querySelector("html"); 
    const wrap = document.getElementById("wrap"); 
    const header = document.getElementById("header"); 
    const gnbAs = document.querySelectorAll(".gnb>li>a"); 
    const depth02s = document.querySelectorAll(".gnb .depth02"); 
    const depth02As = document.querySelectorAll(".gnb .depth02__list>li>a"); 
    const depth03s = document.querySelectorAll(".gnb .depth03"); 
    const gnbWrap = header.querySelector(".gnb__wrap"); 
    const menuBtn = header.querySelector(".menu__btn"); 
    const navCloseBtn = header.querySelector(".gnb__wrap .close__btn"); 
    const searchBtn = header.querySelector(".search__btn"); 
    const searchCloseBtn = header.querySelectorAll(".search__wrap .close__btn"); 
    const container = document.getElementById("container"); 
    const footer = document.getElementById("footer"); 
    const footerBtn = footer.querySelector(".footer__btn");
    const footerInner = footer.querySelector(".footer__inner");
    

    // top 버튼 생성
    function topButton(){
        const button = document.createElement("button");
        button.type = "button";
        button.className = "top__btn bi ico__arrow-up";
        const topBtn = container.appendChild(button);

         // top 버튼 동작
        topBtn.addEventListener("click",function(){
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }topButton();
    
    
    // header 초기화 함수
    function initHeader() {
        initMobileGnbWrap(); // 모바일 gnb 초기화
        header.classList.remove("active");
        gnbAs.forEach(a => a.classList.remove("active"));
        depth02s.forEach(item => {
            item.classList.remove("active");
            item.style.maxHeight = "unset"
        });
        depth03s.forEach(item => item.style.maxHeight = "unset");
        
    };
    // header 초기화 함수(모바일)
    function initMobileHeader(){
        gnbAs.forEach(a => a.classList.remove("active"));
        depth02s.forEach(item => item.style.maxHeight = "0px");
        depth02As.forEach(item => item.classList.remove("active"));
        depth03s.forEach(item => item.style.maxHeight = "0px");
        gnbWrapLangBtn.classList.remove("on");
        gnbWrapLangSelect.classList.remove("active");
    };

    // gnb mouseover 이벤트(데스크톱)
    const gnbMouseover = (a) => {
        const target = a.target;
        const depth02 = target.nextElementSibling; // depth02
        initHeader();
        header.classList.add("active");
        target.classList.add("active");
        if (depth02) depth02.classList.add("active");

    };

    // gnb click 이벤트(모바일)
    const gnbClick = (a) => {
        const target = a.target;
        const depth02 = target.nextElementSibling; // depth02 
        gnbAs.forEach(item => {
            if (item !== target) item.classList.remove("active");
        });
        depth02s.forEach(item => {
            if (item !== depth02) item.style.maxHeight = `0px`;
        });
        depth02As.forEach(item => item.classList.remove("active"));
        depth03s.forEach(item => item.style.maxHeight = `0px`);
        target.classList.toggle("active");

        // 2뎁스 열기/닫기
        if(depth02){
            a.preventDefault();
            toggleSlide(depth02)
        } 
    };

    // 2뎁스 click 이벤트
    const depth02AClick = (a,idx, arr) => {
        const target = a.target;
        const depth03 = target.nextElementSibling; // depth03
        depth02As.forEach(item => {
            if (item !== target) item.classList.remove("active");
        });
        depth03s.forEach(item => {
            if (item !== depth03) item.style.maxHeight = `0px`;
        });
        target.classList.toggle("active");
        // 3뎁스 열기 닫기
        if(depth03){
            a.preventDefault();
            toggleSlide(depth03);
        } 
    };

    // 슬라이드 토글
    function toggleSlide(depth){
        if(depth.style.maxHeight === '0px' || depth.style.maxHeight === ''){
            const depthHeight = depth.scrollHeight;
            depth.style.maxHeight = `${depthHeight}px`;
        }else{
            depth.style.maxHeight = `0px`;
        }
    };

    // 스크롤 막기/해제
    function isBodyScroll(boolean){
        boolean ? html.classList.add("unable") : html.classList.remove("unable");
    };


    // 모바일 메뉴 버튼 이벤트
    let isMenuOpen = false;
    function mobileMenuBtn(btn){
        if(btn.target === menuBtn){ // 메뉴 열기
            if(header.classList.contains("top"))  header.classList.remove("top");
            initMobileHeader();
            gnbWrap.classList.add("active");
            isBodyScroll(true);
            isMenuOpen = true;
        }
        if(btn.target === navCloseBtn){  // 메뉴 닫기
            initMobileGnbWrap(); // 모바일 gnb 초기화
        }
    }
    // 모바일 gnb 초기화
    function initMobileGnbWrap(){
        gnbWrap.classList.remove("active");
        initMobileHeader();
        isBodyScroll(false);
        isMenuOpen = false; 
    };
    
    // 모바일 메뉴 다국어 지원 버튼
    const gnbWrapLangBtn = document.querySelector(".layer__footer .lang");
    const gnbWrapLangSelect = document.querySelector(".layer__footer .lang__select");
    gnbWrapLangBtn.classList.remove("on");
    gnbWrapLangSelect.classList.remove("active");
    gnbWrapLangBtn.addEventListener("click",function(){
        gnbWrapLangBtn.classList.toggle("on");
        gnbWrapLangBtn.classList.contains("on")? gnbWrapLangSelect.classList.add("active") :  gnbWrapLangSelect.classList.remove("active");
        
    });
    
    
    // header 이벤트
    function headerEvents(isTablet){
        // 이벤트 초기화
        function init() {
            if(isTablet){
                gnbAs.forEach(a => {a.removeEventListener("mouseover", gnbMouseover)});
                header.removeEventListener("mouseleave", initHeader);
            }else{
                gnbAs.forEach(a => { a.removeEventListener("click", gnbClick);});
                depth02As.forEach(a => { a.removeEventListener("click",depth02AClick) });
                menuBtn.removeEventListener("click",mobileMenuBtn);
                navCloseBtn.removeEventListener("click",mobileMenuBtn);
            }
        }init();

        
        if(isTablet){
            // gnb 1뎁스
            gnbAs.forEach(a => {
                a.addEventListener("click", gnbClick); 
            });
            // location 2뎁스
            depth02As.forEach(a => {
                a.addEventListener("click",depth02AClick);
            });
            
            menuBtn.addEventListener("click",mobileMenuBtn); // 메뉴 열기
            navCloseBtn.addEventListener("click",mobileMenuBtn); // 메뉴 닫기
        }else{
            // gnb 1뎁스
            gnbAs.forEach(a => {
                a.addEventListener("mouseover", gnbMouseover); 
            });
            header.addEventListener("mouseleave", initHeader);
        }

    };


    // search 팝업
    function searchLayer(){
        const searchWrap  = document.querySelector(".search__wrap");
        searchBtn.addEventListener("click", function(){
            // resizeEvents();
            initHeader();
            searchWrap.classList.add("active");
            // isBodyScroll(true);
        }); 
        searchCloseBtn.forEach(btn => {
            btn.addEventListener("click", function(){
                searchWrap.classList.remove("active");
                // isBodyScroll(false);
            }); 
        })

    } searchLayer();

    

    const contents02 = document.getElementById("contents02");
    const con02VideoWrap = contents02.querySelector(".video__wrap");
    
    // 스크롤 이벤트
    window.addEventListener("scroll",scrollTopEvents);
    let prevScrollTop = 0;
    function scrollTopEvents(){
        const windowHeight = window.innerHeight;
        const scrollTop = html.scrollTop;
        const scrollBottom = scrollTop + windowHeight;

        if (isMenuOpen) return;

        // header
        scrollTop > 0 ? header.classList.add("fix") : header.classList.remove("fix"); // 고정 헤더
        prevScrollTop > scrollTop || scrollTop === 0 ? header.classList.remove("top") : header.classList.add("top"); // 모바일에서 아래로 스크롤 시에 올라가는 헤더
        
        // top 버튼
        const topBtn = document.querySelector(".top__btn");
        scrollTop > 200 ? topBtn.classList.add("on") : topBtn.classList.remove("on"); // top 버튼 보이기/숨기기

        // contents02 비디오
        const con02VideoWrapOffsetTop = con02VideoWrap.offsetTop + 100;
        con02VideoWrapOffsetTop <= scrollBottom ? con02VideoWrap.classList.add("on") : con02VideoWrap.classList.remove("on");
    
        prevScrollTop = scrollTop;
    };

    

    // footer 다국어 버튼 클릭 시
    const langBtn = footer.querySelector(".lang__btn");
    langBtn.addEventListener("click",function(){
        this.classList.toggle("on");
    });

    // 영역 외 클릭 시 이벤트
    window.addEventListener("click", isTartget);
    function isTartget(evnet){
        const target = evnet.target;

        // footer 다국어 버튼
        if(target !== langBtn){
            langBtn.classList.remove("on");
        }
    };

    // 모바일 footer
    function footerBtnEvent(boolean){
        if(boolean){
            footerBtn.addEventListener("click",function(){
                const footerInnerHeight = footerInner.scrollHeight;
                footerBtn.classList.toggle("on");
                if(footerBtn.classList.contains("on")){
                    footerInner.style.maxHeight = footerInnerHeight+"px";
                }else{
                    footerInner.style.maxHeight = "0px";
                }
        
            });
        }else{
            footerInner.style.maxHeight = "unset";
        }
    }


    // 리사이즈 이벤트
    window.addEventListener("resize", resizeEvents);
    function resizeEvents(){
        const wW = window.innerWidth;
        const tablet = 1023;
        const isTablet = wW <= tablet;

        headerEvents(isTablet);
        
        if(isTablet){
            initMobileHeader();
            footerBtnEvent(true);
            langBtn.classList.remove("on");

        }else{
            initHeader(); 
            footerBtnEvent(false);
        }

    }resizeEvents();
    
});