gsap.registerPlugin(ScrollTrigger,ScrollToPlugin);

// DOM 생성 후
document.addEventListener("DOMContentLoaded", function(){
    const header = document.getElementById("header");
    
    const contents01 = document.getElementById("contents01");
    const contents02 = document.getElementById("contents02");
    const contents03 = document.getElementById("contents03");
    const contents04 = document.getElementById("contents04");
    const contents05 = document.getElementById("contents05");

    const con01H2 = contents01.querySelector(".title__wrap h2");
    const con01Ps = contents01.querySelectorAll(".title__wrap p");
    const con01Btn = contents01.querySelector(".title__wrap .shortcut__btn");
    const con02TitleWrap = document.querySelector("#contents02 .title__wrap");
    const con02CardList = document.querySelector("#contents02 .card__list");
    const con02Cards = con02CardList.querySelectorAll("li");
    const con03TitleWrap = document.querySelector("#contents03 .title__wrap");
    const con03H2 = con03TitleWrap.querySelector("h2");
    const con03P = con03TitleWrap.querySelector("p");
    const con03CardList = document.querySelector("#contents03 .card__list");
    const con03Cards = con03CardList.querySelectorAll("li");
    const con04TitleWrap = document.querySelector("#contents04 .title__wrap");
    const con04H2 = con04TitleWrap.querySelector("h2");
    const con04P = con04TitleWrap.querySelector("p");
    const con04Sapn = con04TitleWrap.querySelector("span");
    
    
    
    const gnbAs = document.querySelectorAll(".gnb a");
 
    // gnb
    gnbAs.forEach(a =>{
        const href = document.querySelector(a.getAttribute("href"));
        let hrefST = ScrollTrigger.create({
                        trigger : href,
                        start: "top top",
                        duration:2,
                        ease: "power2.out",
                    });

        a.addEventListener("click",function(event){
            event.preventDefault();
            gsap.to(window,{scrollTo:hrefST.start});
            initLayer();    // gnb 초기화        
        });
    }); 
    // gnb 초기화
    function initLayer(){
        const html = document.querySelector("html");
        const layer = header.querySelector(".layer__wrap");
        html.classList.remove("scroll--hidden");
        layer.classList.remove("active");
    };

    
    // 미디어정의
    let mm = gsap.matchMedia();

    // 1024px 이하일 때
    mm.add("(min-width:1024px)", () => {

        gsap.set([con01H2,con01Ps],{xPercent:-3, opacity:0.4});
        gsap.set(con01Btn,{y:30, opacity:0});

        // contents01
        let con01Tl = gsap.timeline({
            scrollTrigger:{
                trigger:contents01,
                // markers: true,
                start: "top center", 
                end:"bottom center",
                toggleActions: "play restart none none",
            },
        }) 
        con01Tl.to(con01H2,{
            xPercent:0, opacity:1, duraiton:0.2, delay:0,
        })
        con01Ps.forEach((p,idx) =>{
            con01Tl.to(p,{
                xPercent:0, opacity:1, duraiton:0.1, delay:idx*0.01,
            })
        })
        con01Tl.to(con01Btn,{
            y:0, opacity:1, duraiton:0.2, 
            // delay:0.1,
        })


        // contents02
        gsap.to(con02TitleWrap, {
            scrollTrigger: {
              trigger: con02TitleWrap,
              toggleActions: "resume pause reset pause",
            //   markers: true,
              start: "top top",
              end: `+=${con02CardList.clientHeight} bottom`,
              scrub:1,
              pin:true,
              pinSpacing:false,
            },
            ease:"none",
        });

        con02Cards.forEach(card =>{
            gsap.set(card,{opacity:0.4});
            gsap.to(card, {
                opacity:1,
                ease: "power1.inOut",
                duration: 2,
                scrollTrigger: {
                  trigger: card,
                //   markers: true,
                  start: "-=100% top", 
                  end: "-30% 30%",
                  scrub: 2,
                  toggleActions: "play reverse restart reset",
                }, 
            });
              
        })

        // contents03
        gsap.to(contents03,{
            scrollTrigger: {
                trigger:contents03,
                // markers: true,
                start: "top top",
                end: "+=100",
                scrub: true,
                pin:true,
            }, 
        });
        con03Cards.forEach((card,idx) => {
            gsap.set(con03Cards[0],{yPercent:40});
            gsap.set(con03Cards[1],{yPercent:30});
            gsap.set(con03Cards[2],{yPercent:50});

            gsap.to(card,{
                scrollTrigger: {
                    trigger:contents03,
                    // markers: true,
                    start: "-=200 top",
                    end: "+=50 center",
                    scrub: true,
                    toggleActions: "play pause",
                }, 
                ease:"power2",
                yPercent:0,
                duraiton: 1.5,
            });

        });


        // contents04
        let con04Tl = gsap.timeline({
            scrollTrigger: {
                trigger:contents04,
                // markers: true,
                start: "-=10 -=10",
                end: "bottom+=400",
                scrub: 1,
                pin:true,
                snap:1,
            }, 
        });
        gsap.set(con04TitleWrap,{overflow:'hidden'});
        gsap.set([con04H2,con04P,con04Sapn],{yPercent:300});
    
        con04Tl.to(con04H2,{
            yPercent:0,duraiton: 1, ease:"none",
        }).to(con04P,{
            yPercent:0, duraiton: 1, ease:"none",
        }).to(con04Sapn,{
            yPercent:0, duraiton: 1, ease:"none",
        })
        con04Tl.to(con04TitleWrap, {
            duration: 1, 
            ease: "power1.inOut",
        }, "-=0.5");

        // contents05
        gsap.set("#contents05 .title__wrap",{yPercent:100, opacity:0,});
        gsap.to("#contents05 .title__wrap",{
            scrollTrigger: {
                trigger:contents05,
                // markers: true,
                start: `top-=100 center`,
                end: `center center`,
                // scrub: 1,
                toggleActions: "play none resume reverse",
            }, 
            opacity:1,
            yPercent:0,
            duraiton: 4,
            delay: 0.2,
        });

    });

    // 1023px 이하일 때
    mm.add("(max-width:1023px)", (event) => {
        
        gsap.set([con01H2,con01Ps],{y:50, opacity:0.4});
        gsap.set(con01Btn,{y:30, opacity:0});

        let con01Tl = gsap.timeline({
            scrollTrigger:{
                trigger:contents01,
                // markers: true,
                start: "top center", 
                end:"bottom center",
                toggleActions: "play restart none none",
            },
        })  
        
        con01Tl.to(con01H2,{
            y:0, opacity:1, duraiton:0.2, delay:0,
        })
        con01Ps.forEach((p,idx) =>{
            con01Tl.to(p,{
                y:0, opacity:1, duraiton:0.1, delay:idx*0.01,
            })
        })
        con01Tl.to(con01Btn,{
            y:0, opacity:1, duraiton:0.3,
        })




        con02Cards.forEach(card =>{
            gsap.set(card,{opacity:0.2});
            gsap.to(card, {
                opacity:1,
                ease: "power2",
                duration: 2,
                scrollTrigger: {
                  trigger: card,
                //   markers: true,
                  start: "-=200% center-=25%",
                  end: "-100% center",
                  scrub: 2,
                  toggleActions: "play reverse restart reset",
                }, 
            });
              
        })
        
        con03Cards.forEach(card =>{
            gsap.set(card,{opacity:0.2,});
            gsap.to(card, {
                opacity:1,
                y:0,
                ease: "power2",
                duration: 2,
                scrollTrigger: {
                  trigger: card,
                //   markers: true,
                  start: "-=200% center-=25%",
                  end: "-100% center",
                  scrub: 2,
                  toggleActions: "play reverse restart reset",
                }, 
            });
              
        })

        // contents05
        gsap.set("#contents05 .title__wrap",{yPercent:100, opacity:0,});
        gsap.to("#contents05 .title__wrap",{
            scrollTrigger: {
                trigger:contents05,
                // markers: true,
                start: `top center`,
                end: `center center`,
                // scrub: 1,
                toggleActions: "play none resume reverse",
            }, 
            opacity:1,
            yPercent:0,
            duraiton: 4,
            delay: 0.2,
        });


        // 제목 공통
        gsap.set([con02TitleWrap,con03TitleWrap,con04TitleWrap],{yPercent:100, opacity:0,});
        gsap.to(con02TitleWrap,{
            scrollTrigger: {
                trigger:contents02,
                // markers: true,
                start: "-=50 center",
                end: "+=50 ",
                scrub: 1,
            },
            opacity:1,
            yPercent:0,
            duraiton: 4,
            delay: 1,
        });
        gsap.to(con03TitleWrap,{
            scrollTrigger: {
                trigger:contents03,
                // markers: true,
                start: "-=50 center",
                end: "+=50 ",
                scrub: 1,
            }, 
            opacity:1,
            yPercent:0,
            duraiton: 4,
            delay: 1,
        });
        gsap.to(con04TitleWrap,{
            scrollTrigger: {
                trigger:contents04,
                // markers: true,
                start: "-=50 center",
                end: "+=50 ",
                scrub: 1,
            }, 
            opacity:1,
            yPercent:0,
            duraiton: 4,
            delay: 1,
        });



        
    }); 


});
