$(function(){

    // 메뉴 버튼 클릭 시
    $("#header .menu__btn").on("click",function(){
        $(this).toggleClass("close__btn"); 
        $(".gnb__wrap").toggleClass("active");

        // 스크롤 막기/해제
        $(this).hasClass("close__btn") ?  unableScroll(true) : unableScroll(false);
        
    });

    // 스크롤 막기/해제
    function unableScroll(boolean){
        // let saveScrollTop = 0;
        // let currentScrollTop = $(window).scrollTop();
        if(boolean){
            $("html,body").addClass("unable");
        }else{
            $("html,body").removeClass("unable");
        }

    }


    // copy 버튼
    $(".email .copy__btn").click(function(){
        const copyText = $(this).siblings(".email__address").text();
        navigator.clipboard.writeText(copyText).then(() => {
            alert("복사 되었습니다!");
        }).catch((err)=> {
            alert("새로고침 후 재복사 바랍니다!");
            console.dir(err);
        });
    });


    // dialog 버튼
    $(".dialog__btn").click(function(){
        $(this).toggleClass("on");
        const dialog = $(this).siblings("dialog");
        $(dialog).toggleClass("on");
    });


    // 영역 외 클릭 시 이벤트
    $(window).on("click",function(event){
        const target = event.target;

        // 작업 목록 닫기
        if(!target.closest(".page")){
            $("dialog").removeClass("on");
        }
    });


    // 리사이즈 이벤트
    $(window).on("resize",resizeEvnets);
    function resizeEvnets(){
        const wW = $(window).width();
        const moible = 768;
        const isMoible = wW <= moible;


        
        if(isMoible){
            if($("#intro .title__wrap").find(".name").length === 0){
                $("#intro .name").siblings(".title__wrap").children("h2").after($("#intro .name"));
            }
                
        }else{
            if($("#intro .title__wrap").next(".name").length === 0){
                $("#intro .name").closest(".title__wrap").after($("#intro .name"));
            }
        }
    }resizeEvnets();

    

    // const intro = $("#intro"); // intro


    // // 디바운스
    // function debounce(func,delay){
    //     let timeout;
    //     return function(...args){
    //         clearTimeout(timeout);
    //         timeout = setTimeout(()=> func.apply(this, args),delay);
    //     }
    // };

    // const div = $("<div class='mouse__effect'></div>"); // 마우스 효과 태그 생성
    // $(intro).prepend(div);
    // $("#intro .contents__inner").mousemove(debounce(function(event){
    //     const cursorX = event.pageX;
    //     const cursorY = event.pageY;
    //     // const cursorX = Math.round(event.clientX / $(window).innerWidth() * 100);
    //     // const cursorY = Math.round(event.clientY / $(window).innerWidth() * 100);
    //     $(".mouse__effect").css({ transform: `translate(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%))`,left:0 });
    // }, 0.3)); 

    // 디바운스
    // function debounce(func,delay){
    //     let timeout;
    //     return function(...args){
    //         clearTimeout(timeout);
    //         timeout = setTimeout(()=> func.apply(this, args),delay);
    //     }
    // };

    // // contents--01 커서 효과
    // const $div = $("<div class='mouse__effect'>View More</div>");
    // $("body").prepend($div);
    // $(intro).mousemove(debounce(function(event){
    //     const cursorX = event.pageX;
    //     const cursorY = event.pageY; 
    //     const cursor = $(".mouse__effect");

    //     if (!cursor.hasClass("show")) cursor.addClass("show");
    //     cursor.css({ transform: `translate(${cursorX}px, ${cursorY}px)` });
    // }, 0.1));  // 10ms 디바운스
    // $(intro).mouseleave(function(){$(".more__cursor").removeClass("show");});



    

});