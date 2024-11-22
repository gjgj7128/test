$(function(){

    // 디바운스
    function debounce(func,delay){
        let timeout;
        return function(...args){
            clearTimeout(timeout);
            timeout = setTimeout(()=> func.apply(this, args),delay);
        }
    };

    // contents--01 커서 효과
    const $div = $("<div class='more__cursor'>View More</div>");
    $("body").prepend($div);
    $(".contents--01 .swiper a").mousemove(debounce(function(event){
        const cursorX = event.pageX;
        const cursorY = event.pageY; 
        const cursor = $(".more__cursor");

        if (!cursor.hasClass("show")) cursor.addClass("show");
        cursor.css({ transform: `translate(${cursorX}px, ${cursorY}px)` });
    }, 0.5));  // 10ms 디바운스
    $(".contents--01 .swiper a").mouseleave(function(){$(".more__cursor").removeClass("show");});

    
    // 리사이즈 이벤트
    $(window).on("resize",resizeEvents);
    
    let isTablet = false;
    let isMobile = false;
    function resizeEvents(){
        const wW = $(window).width(); 
        const isTabletSize = wW <= 1280; // 태블릿
        const isMobileSize = wW <= 768; // 모바일

        isMobile = isMobileSize;
        isTablet = isTabletSize;        

        initResizeEvents();

    } resizeEvents();
    function initResizeEvents(){
        const menuBtn = $("#header .menu__btn");
        const gnbItems = $(".gnb>li>a");
        const header = $("#header");

        // 기존 이벤트 핸들러 제거
        menuBtn.off("click");
        gnbItems.off("mouseover click");
        header.off("mouseleave");

        // 모바일
        if(isMobile){             
        }
        
        // 태블릿
        if(isTablet){
            // 메뉴 열기/닫기
            menuBtn.on("click",function(){
                $(this).toggleClass("close__btn");
                $(".gnb__wrap.layer__wrap").toggleClass("active");
                if($(".gnb__wrap.layer__wrap").hasClass("active")) $(".gnb__wrap.layer__wrap *").removeClass("active");
            });

            // 2뎁스 열기
            gnbItems.on("click",function(e){
                if($(this).siblings(".depth02__list").length) e.preventDefault();
                gnbItems.toggleClass("active").not(this).removeClass("active")
                gnbItems.siblings(".depth02__list").toggleClass("active").not($(this).siblings(".depth02__list")).removeClass("active");
            });

        }
        

        // 데스크탑
        if(!isMobile && !isTablet){ 

            // 메뉴 열기
            gnbItems.on("mouseover",function(){
                header.addClass("active");
                $(".gnb .depth02__list").addClass("active");
            });
            
            // 메뉴 닫기
            header.on("mouseleave",function(){
                header.removeClass("active");
                $(".gnb .depth02__list").removeClass("active");
            });
        }
    };
    

    // 영역 외 클릭 시 이벤트
    $(window).on("click",isTarget);
    function isTarget(event){ //,reponsive
        let target = event.target;
        
        // gnb 닫기
        if(target.closest(".layer__wrap") && !target.closest(".layer__wrap .layer__inner")){
            $("#header .menu__btn").removeClass("close__btn");
            $(".gnb__wrap.layer__wrap").removeClass("active");
        }

    };


    // top 버튼
    $(".top__btn").click(function(){
        $("html").animate({scrollTop:0}, 90);
    });
    // top 버튼 보이기/숨기기
    function topBtnShow(){
        const scrollTop = $(window).scrollTop(); 
        const con01OffsetBtm = $(".contents--01").offset().top + $(".contents--01").height();

        scrollTop > con01OffsetBtm - 120 ? $(".top__btn").fadeIn(200) : $(".top__btn").fadeOut(200);
    }topBtnShow();

    // 스크롤 이벤트
    $(window).scroll(function(){
        topBtnShow(); // top 버튼
    });
});

