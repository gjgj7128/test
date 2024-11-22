$(function(){

    // 초기화
    function init(){
        $("#header").addClass("on header--blend-mode");
    }init();

    // 레이아웃
    const layout = () =>{
        const header = $("#header"); // header
        const footer = $("#footer"); // footer
        const headerUrl = "./layout/header.html"; // header 파일경로
        const footerUrl = "./layout/footer.html"; // footer 파일경로

        initLayout(headerUrl, header, headerEvents);
        initLayout(footerUrl, footer);
    };
    // 레이아웃 세팅
    function initLayout(url, layout, layoutEvents){
        $.get(url).done((data) => {
            $(layout).html(data);
            if(layoutEvents) layoutEvents(); // 이벤트 바인딩
        }).fail((err) => {
            throw new Error(err);
        });
    };
    // header 이벤트 바인딩
    const headerEvents = () => {
        logo(); // 로고 불러오기

        // header 레이어 팝업 열기
        $("#header .util__list button").on("click", function(event){
            event.stopPropagation();
            const targetBtn = this;
            unableScroll(true);
            isHeaderBlendMode(false);
            $(".section--tab .tab").addClass("z-indx--unset");
            if($(targetBtn).hasClass("menu__btn")){ // 메뉴
                $("#header .layer__wrap.gnb__wrap").addClass("layer__wrap--dimd");
            }else if($(targetBtn).hasClass("search__btn")){ // 검색 
                resizeEvents();
                $("#header .layer__wrap.search__wrap").addClass("layer__wrap--dimd");
                $("#header .logo").addClass("on");
            }

            // 영역 외 클릭 시 닫기
            if( $("#header .layer__wrap").hasClass("layer__wrap--dimd")){
                $(".layer__wrap--dimd").on("click",function(e){
                    if(e.target === e.currentTarget){
                        $("#header .layer__wrap").removeClass("layer__wrap--dimd");
                        $("#header .logo").removeClass("on");
                        setTimeout(() => {isHeaderBlendMode(true);}, 300);
                        unableScroll(false);
                    }
                });
            }
        });
        // header 레이어 팝업 닫기
        $("#header .layer__wrap .close__btn").on("click", function(){
            $("#header .layer__wrap").removeClass("layer__wrap--dimd");
            $("#header .logo").removeClass("on");
            setTimeout(() => {isHeaderBlendMode(true);}, 300);
            unableScroll(false);
            $(".section--tab .tab").removeClass("z-indx--unset");
        }); 
    };
    layout();

    // 로고
    function logo(){
        const logoUrl = "https://mkt-cdn.pstatic.net/mkt/2024/05/airush/assets/img/logo_naver_ai_rush.svg";
        $.get(logoUrl,function(ele){
            const svg = $(ele).children("svg");
            $(".logo a").prepend(svg);
        });
    };

    // header 블렌드 모드 효과
    function isHeaderBlendMode(mode){
        if(mode){
            $("#header").addClass("header--blend-mode");
        }else{
            $("#header").removeClass("header--blend-mode");
        }
    };
    // header (스크롤 시) 보이기/숨기기
    function isHeaderOn(boolean){
        if(boolean){
            $("#header").addClass("on"); // 보이기
        }else{
            $("#header").removeClass("on"); // 숨기기
        }
    };

   // 스크롤 막기/해제
    function unableScroll(boolean){
        if(boolean){
            $("html,body").addClass("unable");
        }else{
            $("html,body").removeClass("unable");
        }

    }

    
    // 탭메뉴
    $(".tab__list li").click(function(){
        const tab = $(this).closest(".tab");
        const tabIdx = $(this).index();

        $(".tab__list li").not(this).removeClass("on");
        $(this).addClass("on");

        // biz
        if($(tab).siblings(".biz__list__wrap")){
            $(".biz__list__wrap>ul").removeClass("on");
            $(".biz__list__wrap>ul").eq(tabIdx).addClass("on");
        }

        // faq
        if($(tab).siblings(".faq__list___wrap")){
            $(".faq__list___wrap>ul").hide();
            $(".faq__list___wrap>ul").eq(tabIdx).show();
        }

    });


    // 스크롤 이벤트
    let prevScrollTop = 0;
    $(window).on("scroll",function(){
        scrollEvents();
    });
    scrollEvents();
    function scrollEvents(){
        const scrollTop = $(this).scrollTop();
        const wH = $(window).height();

        if (prevScrollTop < scrollTop) { // 내림
            isHeaderOn(false);
            
        } else if(prevScrollTop >= scrollTop || scrollTop <= 10){ // 올림 || 스크롤 10 이하일 때
            isHeaderOn(true);
        }
        prevScrollTop = scrollTop;
    }

    // 리사이즈 이벤트
    $(window).on("resize", resizeEvents);
    function resizeEvents(){
        const wW = $(window).width();
        const tablet = 1419; // 테블릿
        const mobile = 767; // 모바일        
    
        // 모바일 일 때
        if(wW <= mobile){
            $("#headerLayerSearch").attr("placeholder","주제나 키워드를 검색해보세요");
        }else{
            $("#headerLayerSearch").attr("placeholder","관심있는 주제나 키워드를 검색해보세요");
        }
    }resizeEvents();

    
});

