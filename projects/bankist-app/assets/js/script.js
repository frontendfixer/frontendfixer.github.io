"use strict";const modal=document.querySelector(".modal"),overlay=document.querySelector(".overlay"),btnCloseModal=document.querySelector(".btn--close-modal"),btnsOpenModal=document.querySelectorAll(".btn--show-modal"),btnScrollTo=document.querySelector(".btn--scroll-to"),section1=document.querySelector("#section--1"),nav=document.querySelector(".nav"),tabs=document.querySelectorAll(".operations__tab"),tabConstainer=document.querySelector(".operations__tab-container"),tabsContent=document.querySelectorAll(".operations__content"),openModal=function(){modal.classList.remove("visually-hidden"),overlay.classList.remove("visually-hidden")},closeModal=function(){modal.classList.add("visually-hidden"),overlay.classList.add("visually-hidden")};btnsOpenModal.forEach((e=>e.addEventListener("click",openModal))),btnCloseModal.addEventListener("click",closeModal),overlay.addEventListener("click",closeModal),document.addEventListener("keydown",(function(e){"Escape"!==e.key||modal.classList.contains("visually-hidden")||closeModal()})),btnScrollTo.addEventListener("click",(function(){section1.getBoundingClientRect();section1.scrollIntoView({behavior:"smooth"})})),document.querySelector(".back-to-top").addEventListener("click",(()=>document.querySelector("body").scrollIntoView({behavior:"smooth"}))),document.querySelector(".nav__links").addEventListener("click",(e=>{e.preventDefault();const t=e.target;if(t.classList.contains("nav__link")){const e=t.getAttribute("href");document.querySelector(e).scrollIntoView({behavior:"auto",block:"start"})}})),tabConstainer.addEventListener("click",(e=>{const t=e.target.closest(".operations__tab");t&&(tabs.forEach((e=>e.classList.remove("operations__tab--active"))),t.classList.toggle("operations__tab--active"),tabsContent.forEach((e=>{e.classList.remove("operations__content--active")})),document.querySelector(`.operations__content--${t.dataset.tab}`).classList.add("operations__content--active"))}));const handelHover=function(e){if(e.target.classList.contains("nav__link")){const t=e.target,o=t.closest(".nav").querySelectorAll(".nav__link"),n=t.closest(".nav").querySelector("img");o.forEach((e=>{e!==t&&(e.style.opacity=this)})),n.style.opacity=this}};nav.addEventListener("mouseover",handelHover.bind(.5)),nav.addEventListener("mouseout",handelHover.bind(1));const header=document.querySelector(".header"),navHeight=nav.getBoundingClientRect().height,stickyNav=function(e){const[t]=e;t.isIntersecting?nav.classList.remove("sticky"):nav.classList.add("sticky")},headerObserver=new IntersectionObserver(stickyNav,{root:null,threshold:0,rootMargin:`-${navHeight}px`});headerObserver.observe(header);const sections=document.querySelectorAll(".section"),reveleSection=function(e,t){const[o]=e;o.isIntersecting&&(o.target.classList.remove("section--hidden"),t.unobserve(o.target))},sectionObsever=new IntersectionObserver(reveleSection,{root:null,threshold:.2});sections.forEach((e=>{sectionObsever.observe(e),e.classList.add("section--hidden")}));const targetImgs=document.querySelectorAll("img[data-src]"),loadImg=function(e,t){const[o]=e;o.isIntersecting&&(o.target.src=o.target.dataset.src,o.target.addEventListener("load",(()=>o.target.classList.remove("lazy-img"))),t.unobserve(o.target))},imgObserver=new IntersectionObserver(loadImg,{root:null,threshold:.8});targetImgs.forEach((e=>imgObserver.observe(e)));const carouselSlider=function(){const e=document.querySelectorAll(".slide"),t=document.querySelector(".slider__btn--left"),o=document.querySelector(".slider__btn--right"),n=document.querySelector(".dots");let s=0;const c=e.length,r=function(t){e.forEach(((e,o)=>{e.style.transform=`translateX(${100*(o-t)}%)`}))},a=function(){s===c-1?s=0:s++,r(s),i(s)},l=function(){0===s?s=c-1:s--,r(s),i(s)},i=function(e){document.querySelectorAll(".dots__dot").forEach((e=>{e.classList.remove("dots__dot--active")})),document.querySelector(`.dots__dot[data-slide="${e}"]`).classList.add("dots__dot--active")};e.forEach(((e,t)=>{n.insertAdjacentHTML("beforeend",`<button class="dots__dot" data-slide="${t}"></button>`)})),i(0),r(0),o.addEventListener("click",a),t.addEventListener("click",l),document.addEventListener("keydown",(e=>{"ArrowLeft"===e.key&&l(),"ArrowRight"===e.key&&a()})),n.addEventListener("click",(e=>{const t=e.target;if(t.classList.contains("dots__dot")){const{slide:e}=t.dataset;r(e),i(e)}}))};carouselSlider();
//# sourceMappingURL=script.js.map