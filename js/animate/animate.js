/* 특별관 파일 경로 */
const sphole_file = [
    '/assets/img/specialHole/16390080561620.png',
    '/assets/img/specialHole/16553622935690.png',
    '/assets/img/specialHole/16382612660240.png',
    '/assets/img/specialHole/16382612660560.png'
];

document.addEventListener("DOMContentLoaded", function(){
    const navmenuItems = document.querySelector(".nav-menu-wrap > ul");
    const navDetailBox = document.querySelector(".nav-detail-contents");

    const navRollingAddClass = () => {
       $(".nav-detail-contents").addClass("rolling");
    }
    const navRollingRemoveClass = () => {
        $(".nav-detail-contents").removeClass("rolling");
     }

    /* 네비게이션 메뉴 마우스 오버 아웃 애니메이션 */
    navmenuItems.addEventListener("mouseover",navRollingAddClass);

    navmenuItems.addEventListener("mouseout",navRollingRemoveClass);

    navDetailBox.addEventListener("mouseover",navRollingAddClass);

    navDetailBox.addEventListener("mouseout",navRollingRemoveClass);
});

/* 특별관 마우스 오버 이벤트 */

$(function(){
    let sp_img = document.querySelector('.sphole-main img');
    const sp_list = document.querySelectorAll('.sphole-info-list > li');

    for(let i = 0 ; i < sp_list.length ; i++){
        sp_list[i].addEventListener('mouseover', ()=>{
            sp_img.setAttribute('src', sphole_file[i]);
        });
    }
});

$(()=>{
    /* 네비게이션 스크롤 css변경 이벤트 */
    document.addEventListener('scroll', function(e){
        let _scrollTop = window.scrollY || document.documentElement.scrollTop;
        let headerHeight = document.querySelector('header > .header-contents').clientHeight;
        let headerContents = $('header > .nav-menu-contents');
        let navDetail = document.querySelector('header > .nav-detail-contents');

        if(_scrollTop >= headerHeight){
            headerContents.addClass('nav-red-back');

            navDetail.style.position = 'fixed';
            navDetail.style.top = `${$('header > .nav-menu-contents').outerHeight()-1}px`;

            $('.nav-menu-items a').addClass('white-color');
            $('#btn_header_search').addClass('btn_whiteSearch');
        }else{
            headerContents.removeClass('nav-red-back');

            navDetail.style.position = '';
            navDetail.style.top = '';

            $('.nav-menu-items a').removeClass('white-color');
            $('#btn_header_search').removeClass('btn_whiteSearch');
        }
    });
});
