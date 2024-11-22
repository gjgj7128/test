gsap.registerPlugin(ScrollTrigger);

$(function(){
    const intro = $("#intro");
    const aboutMe = $("#aboutMe");
    const profile = $("#profile");
    const portfolio = $("#portfolio");
    const contact = $("#contact");


    // 공통효과
    let itemSet = {opacity:0,y:100};
    const commonToggleActions = "play none none reverse";
    
    // h2 타이틀(profile, portfolio)
    const profileH2 =  $("#profile .title__wrap h2");
    const portfolioH2 =  $("#portfolio .title__wrap h2");
    gsap.set([profileH2,portfolioH2],itemSet);


    // intro 글자 자르기
    let introH2 = $("#intro h2");
    let introH2Arr = introH2.text().split("");
    introH2.empty();
    introH2Arr.forEach(item => {
        let span = $("<span class='letter'></span>");
        $(span).text(item);
        $(introH2).append(span);
    });


    const introName = $("#intro .name");
    gsap.set(introName ,{alpha : 0});
    
    // intro
    // intro 타이틀 효과
    let introTl = gsap.timeline({
        scrollTrigger:{
            trigger: intro,
            start:"0 center",
            end : "bottom center",
            // markers:true,
            toggleActions:"play puase restart none",
        },
    });
    introTl.fromTo(".letter", 
        {
            rotationX:90,
            yPercent:-50,
        }, 
        {
            rotationX:0,
            yPercent:0,
            delay:0.5,
            duration: 0.3,
            stagger: 0.2,
            ease: "power3.in"
        }
    ).to(introName,{
        alpha : 1, duration: 0.8, ease: "linear"
    }, "-=1")

    gsap.to("#intro .title__wrap" ,{
        scrollTrigger:{
            trigger: intro,
            scrub:1,
            start:"top top",
            end : "bottom top",
            // markers:true,
        },
        scrub:1,
        yoyo: true,
        yPercent : -10,
        ease: "none",
    })

    
    const aboutMeAbout = $("#aboutMe .about");
    
    // about
    gsap.set(aboutMeAbout ,{alpha : 0.1, yPercent:5});   
    gsap.to(aboutMeAbout ,{
        scrollTrigger:{
            trigger: aboutMe,
            scrub:2,
            snap:1,
            start:"top top",
            end: "center top",
            pin:true,
            pinSpacing: true,
        },
        yoyo: true,
        alpha : 1,
        yPercent : 0,
        ease: "none",
    })
  
    const profileImgWrap = $("#profile .profile__img .img__wrap");
    const profileRightItems = $("#profile .profile__right__item");

    // profile
    gsap.set(profileRightItems,itemSet);

    let profileTl = gsap.timeline({
        scrollTrigger:{
            trigger:profile,
            start:"top center",
            end:"bottom center",
            // markers:true,
            toggleActions:"play none none reverse"
        },
    });
    profileTl.to(profileH2,{
        opacity:1, y:0, duration:0.5,
    }).fromTo(profileImgWrap,
        {
            rotationX:90,
        },{
            rotationX:0,
            duration:0.5,
        }
    )
    .to(profileRightItems,{
        opacity:1,
        y:0,
        stagger:0.3,
        duration:0.5,
    }, "-=0.5")

    
    const portfolioTitleSpan = $("#portfolio .title__wrap span");
    const portfolioList = $("#portfolio .portfolio__list");
    const portfolioLis = $("#portfolio .portfolio__list>li");

    gsap.set([portfolioTitleSpan,portfolioLis],itemSet);
    
    // portfolio
    let portfolioTl = gsap.timeline({
        scrollTrigger:{
            trigger:portfolio,
            start:"top center",
            end:"bottom center",
            toggleActions:commonToggleActions,
        },
    });

    portfolioTl.to(portfolioH2,{
        opacity:1, y:0, duration:0.5,
    }).to(portfolioTitleSpan,{
        opacity:1, y:0, duration:0.3,
    }).to(portfolioLis,{
        opacity:1,
        y:0,
        stagger:0.2,
        duration:0.3,
    }, "-=0.2")



    const contactArea = $("#contact .contact__area");
    const contactEmail = $("#contact .email");
    gsap.set(contactArea,{opacity:0,scale:1.2});
    
    // contactArea
    gsap.to(contactArea,{
        scrollTrigger:{
            trigger:contact,
            start:"top center",
            end:"bottom bottom",
            toggleActions:commonToggleActions,
        },
        opacity:1,scale:1, duration:1, delay:0.4,
    })
    
    // gnb
    const gnbAs = gsap.utils.toArray(".gnb li a");
    gnbAs.forEach(a => {
        let href = $(a).attr("href");
        let conST = ScrollTrigger.create({
            trigger: href,
            start: "top top",
        });
        ScrollTrigger.create({
            trigger: href,
            start: "top center",
            end: "bottom center",
            onToggle :(self) => self.isActive && aActive(a),
        });
        $(a).on("click",function(event){
            event.preventDefault();
            $('html, body').stop().animate({scrollTop:$(href).offset().top }, 680,"linear")

        })

    })
    
    // gnb a 액션
    function aActive(href){
        $(".gnb li a").addClass("on").not(href).removeClass("on");
    };
    

});