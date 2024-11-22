gsap.registerPlugin(ScrollTrigger);

$(function(){
    const contents01 = $(".contents--01");
    const contents02 = $(".contents--02");
    const contents03 = $(".contents--03");
    const contents04 = $(".contents--04");
    const contents05 = $(".contents--05");


    // 타이틀 애니메이션
    const titleAni = $(".title--animation");
    const titleAniH2__01s = $(".title--animation h2:first-child");
    const titleAniH2__02s = $(".title--animation h2:last-child");

    // 타이틀 애니메이션
    gsap.set([titleAniH2__01s,titleAniH2__02s],{xPercent:0});
    function titleAniST(array,x){
        array.each(function(idx,h2){
            const con = $(h2).closest(".contents")[0]; // 부모 요소 찾기
            gsap.to(h2, {
                scrollTrigger:{
                    trigger: con,
                    scrub:2,
                    start:"top bottom-=20%",
                    end : "bottom top",
                    // markers:true,
                },
                yoyo: true,
                xPercent: x,
                ease: "power4.out",
            });        
        });
    };

    const con01SwiperWrapper = $(".contents--01 .swiper-wrapper");
    const con01Slides = $(".contents--01 .swiper-slide");
    const con01SlideTitleWrap = $(".contents--01 .swiper-slide .title__wrap");

    // contents01 모션 타임라인
    let con01Tl = gsap.timeline();

    gsap.set(con01SwiperWrapper, {autoAlpha: 0.1, scale:0.9 })
    gsap.set(con01Slides, {scale:1.2})
    gsap.set(con01SlideTitleWrap, {opacity:0, y:100});

    con01Tl.to(con01SwiperWrapper, {
        autoAlpha: 1,scale:1,duration:0.8,
    }).to(con01Slides, {
        autoAlpha: 1,scale:1,duration:0.8,
    }, 0).to(con01SlideTitleWrap, {
        opacity: 1, y:0, duration:0.5,
    }, "+=0.1");



    const con0203ImgrWraps = $(".contents--02 .img__wrap, .contents--03 .img__wrap");

    // contents02 모션
    gsap.set(con0203ImgrWraps, {scale:0.8});

    con0203ImgrWraps.each(function(idx,wrap){
        const img = $(wrap).children("img");
        gsap.set(img, {scale:1.2});

        let sT = ScrollTrigger.create({
                trigger:wrap,
                start: "top bottom-=20%",
                end: "top top",
                // markers:true,
        });
        gsap.to(wrap, {
            scrollTrigger : sT,
            scale:1,duration:1,
        });
        gsap.fromTo(img, 
            { scale:1.4}, 
            { scrollTrigger : sT,scale:1,duration:1,}
        );
    });

    
    const con05Inner = $(".contents--05 .contents__inner");
    const con05TitleWrap = $(".contents--05 .title__wrap");

    // contents05 모션
    let con05ST = ScrollTrigger.create({
        trigger:contents05,
        start: "top bottom",
        end: "top top",
    });

    gsap.set(con05Inner, {scale:0.9})
    gsap.set(con05TitleWrap, {opacity:0, y:100});

    gsap.to(con05Inner,{
        scrollTrigger:con05ST,
        scale:1,
        duration:0.8,
    })
    gsap.to(con05TitleWrap,{
        scrollTrigger:con05ST,
        opacity: 1, 
        y:0,
        duration:0.8,
        delay:0.5,
    })



    // 미디어정의
    let mm = gsap.matchMedia();

    // 1024px 이하일 때
    mm.add("(min-width:1024px)", () => {

        titleAniST(titleAniH2__01s,-17);
        titleAniST(titleAniH2__02s,18);
    })

    // 1024px 이하일 때
    mm.add("(max-width:1023px)", () => {

        // 타이틀 애니메이션
        titleAniST(titleAniH2__01s,-20);
        titleAniST(titleAniH2__02s,20);
       
    })

});