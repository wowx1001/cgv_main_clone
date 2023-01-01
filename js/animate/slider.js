let e_pageVal = 0;
let e_pageIdx = 1;
let e_pageLength = 2;


let curChartVal = 0;
let curChartIdx = 1;
const chartSlideLength = 4;

const wait = (sec)=>{
    let start = Date.now(), now = start;
    while (now - start < sec * 1000) {
        now = Date.now();
    }
}

const addListenerMovieSlideItems = ()=>{
    const movieImgWrap = document.querySelectorAll("#chart-slider > .slider-wrap > .slider-items");

    /* 영화 이미지 마우스 오버 아웃 애니메이션 */
    for(let i = 0; i < movieImgWrap.length ;i++){
        let imgWrapElem = movieImgWrap[i];
        let imgMask = imgWrapElem.querySelector(".img-mask");
        let marker = imgWrapElem.querySelector(".movie-marker");
    
        imgWrapElem.addEventListener("mouseover", function(){
            imgMask.style.visibility = 'visible';
            marker.style.visibility = 'hidden';
        })
    
        imgWrapElem.addEventListener("mouseout", function(){
            imgMask.style.visibility = 'hidden';
            marker.style.visibility = 'visible';
        })
    }
}

/* 영화데이터 렌더링 */
const setSlideItems = (wrapElem, data)=>{
    const slideWrap = wrapElem;
    let items = '';

    for(let i = 0; i<data.length; i++){
        items += `
        <div class="slider-items">
            <div class="img-wrap">
                <img src="${data[i].file_path}"/>
                <div class="img-mask">
                    <div class="btn-wrap">
                        <a class="first-btn" href="#">상세보기</a>
                        <a class="second-btn" href="#">예매하기</a>
                    </div>
                </div>
                <div class="movie-marker">
                    <i class="age-limit${data[i].age_limit=='all'?' age-green':data[i].age_limit=='12'?' age-yellow':' age-orange'}">
                    ${data[i].age_limit}
                    </i>
                    <i class="movie-rank">${data[i].id}</i>
                    <div class="cinema-type">
                        ${data[i].imax?'<img src="/assets/img/icon/imax_white.png" alt="imax"/>':''}
                        ${data[i].cinema_4d?'<img src="/assets/img/icon/forDX_white.png" alt="forDX"/>':''}
                        ${data[i].screen_x?'<img src="/assets/img/icon/screenx_white.png" alt="screenx"/>':''}
                    </div>
                </div>
            </div>
            <div class="chart-info-wrap">
                <strong>${data[i].title}</strong>
                <div>
                    <span>${data[i].eggs}</span>
                    <span>예매율 ${data[i].r_rate}</span>
                </div>
            </div>
        </div>        
        `;
    }

    slideWrap.innerHTML = items;
}

/* 슬라이드 이동 함수 */
const moveMovieSlide = (status) => {
    let slide = document.querySelector('#chart-slider > .slider-wrap');
    if(status=='next'){
        curChartVal-=82.5;
        slide.style.transform = `translate(${curChartVal}%, 0)`;
        curChartIdx++;
    }else if(status=='prev'){
        curChartVal+=82.5;
        slide.style.transform = `translate(${curChartVal}%, 0)`;
        curChartIdx--;
    }
    
    if(curChartIdx==1){
        $('.chart-contents > .slider-prev').toggleClass('btn-hidden');
    }else if(curChartIdx==chartSlideLength){
        $('.chart-contents > .slider-next').toggleClass('btn-hidden');
    }else{
        $('.chart-contents > .slider-prev').removeClass('btn-hidden');
        $('.chart-contents > .slider-next').removeClass('btn-hidden');
    }
}

/* 이벤트 부착 */
$('#chart-slider > .slider-wrap').ready(()=>{
    const elem = document.querySelector('#chart-slider > .slider-wrap');
    setSlideItems(elem, movieData);
    addListenerMovieSlideItems();
});

$('.chart-contents > .slider-prev').ready(()=>{
    const prev = $('.chart-contents > .slider-prev');
    prev.on("click", function() {  
        moveMovieSlide("prev");
    });
});
$('.chart-contents > .slider-next').ready(()=>{
    const next = $('.chart-contents > .slider-next');
    next.on("click", function() {  
        moveMovieSlide("next");
    });
});


/* 이벤트 섹션 슬라이더 */

/* 슬라이드 이동 함수(이벤트 페이지) */
const moveEventSlide = () => {
    let slide = document.querySelector('#event-slider > .slider-wrap');

    if(e_pageIdx==1){
        e_pageVal-=69;
        slide.style.transform = `translate(${e_pageVal}%, 0)`;
        e_pageIdx++;
        $('.event-contents > .slider-next').toggleClass('btn-hidden');
        $('.event-contents > .slider-prev').toggleClass('btn-hidden');
    }else if(e_pageIdx==e_pageLength){
        e_pageVal+=69;
        slide.style.transform = `translate(${e_pageVal}%, 0)`;
        e_pageIdx--;
        $('.event-contents > .slider-prev').toggleClass('btn-hidden');
        $('.event-contents > .slider-next').toggleClass('btn-hidden');
    }
}

$('.event-contents  > .slider-prev').ready(()=>{
    const e_prev = $('.event-contents > .slider-prev');
    e_prev.on("click", function() {  
        moveEventSlide();
    });
});

$('.event-contents  > .slider-next').ready(()=>{
    const e_next = $('.event-contents > .slider-next');
    e_next.on("click", function() {  
        moveEventSlide();
    });
});

$(document).ready(()=>{
    setInterval(()=>{
        moveEventSlide();
    },4000);
});