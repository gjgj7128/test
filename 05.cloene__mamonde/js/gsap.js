gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded",function(){
    const contents01 = document.getElementById("contents01");
    const contents02 = document.getElementById("contents02");
    const contents03 = document.getElementById("contents03");
    const contents04 = document.getElementById("contents04");

    // contents03
    const con03TitleWrap = contents03.querySelector(".title__wrap");
    let con03Tl = gsap.timeline({
        scrollTrigger:{
            trigger:contents03,
            start:"top bottom-=25%",
            end:"bottom top+=25%",
            // markers:true,
            ease: "power4.out",
            toggleActions:"play reverse play reverse"
        }
    })
    con03Tl.fromTo(contents03,
        {scale:0.8},
        {scale:1, duration:1.3}
    ).fromTo(con03TitleWrap,
        {y:50,opacity:0},
        {y:0,opacity:1,duration:0.5}
    ,"-=0.5")

});