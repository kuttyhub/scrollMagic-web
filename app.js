let controller;
let slideScene;

function animate(){

    //Init Controll
    controller = new ScrollMagic.Controller();
    //hooks elements
    const slides=document.querySelectorAll(".slide");
    const navBar=document.querySelector(".nav-bar");

    slides.forEach((slide,index,slides)=>{
        console.log(slide);
    const revealImg = slide.querySelector(".img-cover-div");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".text-cover-div");
    const line=navBar.querySelector(".line");
    const xValue=`${index*100+25}%`;
    console.log(xValue);
    
    //GSAP
    const slideTl = gsap.timeline({
      defaults: { duration: .5, ease: "power2.inOut" }
    });
    //slideTl.fromTo(navBar,{y:"-100%"},{y:"0%"});
    slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    //slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
    slideTl.to(line,{x:xValue});
    slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.75");

    //Create Scene
    slideScene = new ScrollMagic.Scene({
        triggerElement: slide,
        triggerHook: 0.25,
      })
        //.addIndicators({
          //   colorStart: "white",
          //   colorTrigger: "white",
          //   name: "slide"
          // })
        .setTween(slideTl)
        .addTo(controller);
    //new animation
    const pageTl=gsap.timeline();
    
    let nextSlide=slides.length-1 === index?'end':slides[index+1];
    let nextSlideImg=slides.length-1 === index?'end':nextSlide.querySelector("img");
    
    pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
    pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
    pageTl.fromTo(nextSlideImg,{x:"-100%"},{x:'0%'},);
    pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.1");

    pageScene = new ScrollMagic.Scene({
        triggerElement:slide,
        duration:"100%",
        triggerHook:0
    })
    // .addIndicators({
    //     colorStart: "white",
    //     colorTrigger: "white",
    //     name: "page",
    //     indent: 200
    //   })
      .setPin(slide, { pushFollowers: false })
      .setTween(pageTl)
      .addTo(controller);

    });
   
}
animate()