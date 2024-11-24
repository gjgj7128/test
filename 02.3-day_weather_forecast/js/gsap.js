gsap.registerPlugin(ScrollToPlugin,ScrollTrigger);

document.addEventListener("DOMContentLoaded",function(){
  const moSize = 767; // 모바일 사이즈
  let isMobile = window.innerWidth <= moSize; // 모바일 일 때

  let container = document.getElementById("container");
  let gnbA = gsap.utils.toArray(".gnb li a");
  let contents = gsap.utils.toArray(".contents");

  // gnb 이동
  gnbA.forEach((item, idx) =>{
    const eleId = document.querySelector(item.getAttribute("href"));
    let gnbST = ScrollTrigger.create({
                    trigger : eleId,
                    start: "top top",
                    duration:2,
                    ease: "power3.out",
                });
    ScrollTrigger.create({
      trigger : eleId,
      start: "top center",
      end : "bottom center",
      ease: "power3.out",
      onToggle: self => self.isActive? gnbIndicate(idx): false,
    });
    item.addEventListener("click",(e) =>{
      e.preventDefault();
      gsap.to(window, {
        scrollTo : gnbST.start,
        autoKill: false,
        // scrub:true,
        // pin:false,
        duration:0,
        ease: "power3.out",
      });
      gnbIndicate(idx);
    });
  });


  // gnb class
  function gnbIndicate(index) {
    gnbA.forEach((item, idx) => {
        item.classList.remove("on");
        if (idx === index) {
            item.classList.add("on");
        }
    });
  }

  // svg 모션
  const svgs = gsap.utils.toArray(".weather .svg__wrap");
  
  svgs.forEach((svg)=>{
    svg.classList.add("stop")
    gsap.set(svg,{opacity:0});
    gsap.to(svg,{
      yoyo:true,
      opacity:1,
      duration:2.5,
      delay:0.3,
      scrollTrigger:{
        trigger:svg,
        // markers:true,
        start:"top 90%",
        end:"center",
        ease: "power2",
        toggleActions:"play reverse play reverse",
        onEnter:() => {svg.classList.remove("stop");},
        onEnterBack :() => {svg.classList.remove("stop");},
        onLeave:() => {svg.classList.add("stop");},
        onLeaveBack :()=>{svg.classList.add("stop");},
      },
    })
  })
  // 날씨 정보 박스 모션
  const summarys = gsap.utils.toArray(".weather__summary__wrap");
  summarys.forEach((summary)=>{
    gsap.set(summary,{opacity:0, xPercent:80});
    gsap.to(summary,{
      yoyo:true,
      xPercent:0,
      opacity:1,
      scrollTrigger:{
        // markers:true,
        trigger:summary,
        start:'top bottom',
        end:'bottom',
        duration:2,
        ease: "power2",
        toggleActions: "play reverse restart reverse"
      },
      
    });
    
  })



});