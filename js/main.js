/* ================  aside2  ============= */
let change_links2 = document.querySelectorAll('#aside2 .links ul li');
let main2 = document.querySelector('#aside2 .links a');
let icon_home2 = document.getElementById('home');
let links_childreen2 = document.querySelectorAll('#aside2 .small ul ul')
let change_open2 = document.querySelectorAll('#aside2 .change-open');
change_open2.forEach((e, i, arr)=>{
    e.onclick = function(){
        links_childreen2.forEach((e, i, arr)=>{
            e.classList.remove('show');
        })
        change_open2.forEach((e,i,arr)=>{
            e.classList.remove('bg-active')
        })
        this.classList.add('bg-active');
        links_childreen2[i].classList.toggle('show');
    }
})


/* ================  aside1  ============= */

let change_links1 = document.querySelectorAll('#aside1 .big ul li');
let links_childreen1 = document.querySelectorAll('#aside1 .big ul ul')
let change_open1 = document.querySelectorAll('#aside1 .change-open1');
change_open1.forEach((e, i, arr)=>{
    e.onclick = function(){
        links_childreen1.forEach((e, i, arr)=>{
            e.classList.remove('show');
        })
        change_open1.forEach((e,i,arr)=>{
            e.classList.remove('bg-active')
        })
        this.classList.add('bg-active');
        links_childreen1[i].classList.toggle('show');
    }
})


/*=====================  Start Icon-List2 ===================*/

let icon_list = document.getElementById('list2');
let header = document.getElementById('main-header');
let aside1 = document.getElementById('aside1');
let aside2 = document.getElementById('aside2');
let type = document.getElementById('type');
let AllAside = document.querySelectorAll('aside');

/*================  Start Resposive 960px   ============= */

 

/*================  End Resposive 960px   ============= */
    if(window.screen.width <= 960){
        aside2.classList.remove('visible-sh');
        aside2.classList.add('wd-0px');
    }
    else{
        aside2.classList.add('visible-sh');
        aside2.classList.remove('wd-100px');
    }


icon_list.onclick = function(){
        aside1.classList.toggle('less-width');
        aside1.classList.toggle('visible-hi');
        aside2.classList.toggle('less-width');
        aside2.classList.toggle('visible-sh');
    
        if(screen.width <= 960){
            aside2.classList.toggle("wd-100px");
            aside2.classList.toggle('wd-0px');
        }
        document.getElementById('page').classList.toggle('fill-width');
        header.classList.toggle('fill-width');
}


/*=====================  End Icon-List2 ===================*/


// /*=====================  Start Pgination ===================*/
let tbody = document.querySelector("tbody");
let pageUl = document.querySelector(".pagination");
let itemShow = document.getElementById("row-num");
let tr = tbody.querySelectorAll("tr");
let next =document.getElementById('next');
let prev =document.getElementById('prev');
let emptyBox = [];
let index = 1;
let itemPerPage = 10;

for(let i=0; i<tr.length; i++){
    emptyBox.push(tr[i]);
}

itemShow.onchange = giveTrPerPage;
function giveTrPerPage(){
    index = 1
    itemPerPage = Number(this.value);
    displayPage(itemPerPage);
    pageGenerator(itemPerPage);
    getpagElement(itemPerPage);
    PrintNum_From_TO(itemPerPage);
}

function displayPage(limit){
    tbody.innerHTML = '';
    if(limit > tr.length){
        tr.forEach(e=>{
            tbody.appendChild(e);
        })
    }
    else{
        for(let i=0; i < limit; i++){
            tbody.appendChild(emptyBox[i]);
        }
        let pageNum = pageUl.querySelectorAll('.list');
        pageNum.forEach(n => n.remove());
    }

}
displayPage(itemPerPage);

function pageGenerator(getem){
    let num_of_tr = emptyBox.length;
    if(num_of_tr <= getem){
        pageUl.style.display = 'none';
    }
    else{
        pageUl.style.display = 'flex';
        let num_Of_Page = Math.ceil(num_of_tr/getem);
        for(i=1; i<=num_Of_Page; i++){
            let li = document.createElement('li');
            li.className = 'list';
            let span = document.createElement('span');
            span.innerText = i;
            if(i > 3){
                span.classList.add('dis-n');
            }
            span.setAttribute('data-page', i);
            li.appendChild(span);
            pageUl.insertBefore(li,pageUl.querySelector('.next'));
        }        
    }
}
pageGenerator(itemPerPage);
let pageLink = pageUl.querySelectorAll("li");
let lastPage =  pageLink.length - 2;
let span = document.querySelectorAll('span');


function pageRunner(page, items, lastPage, active){
    
    for(button of page){
        button.onclick = e=>{
            let page_num = e.target.getAttribute('data-page');
            let page_mover = e.target.getAttribute('id');
            if(page_num != null){
                index = page_num;
            }else{

                if(page_mover === "next"){
                    index++;

                    prev.classList.remove('disable');
                    if(index >= lastPage){
                        index = lastPage;
                        next.classList.add('disable');
                        
                    }
                    if(index >= 3){
                        let span = document.querySelectorAll('span');
                        span[index + 1].classList.remove('dis-n');
                        span[index - 2].classList.add('dis-n');
                    }

                }else{
                    let span = document.querySelectorAll('span');

                    index--;
                    if(index <= 1){
                        index = 1;
                        prev.classList.add('disable');
                    }
                    if(index >= 3){
                    span[index + 2].classList.add('dis-n');
                    span[index - 1].classList.remove('dis-n');
                }
                    span[index].classList.remove('dis-n');
                    next.classList.remove('disable');

                }
            }
            pageMaker(index, items, active);
        }
    }

}
let pageLi = pageUl.querySelectorAll('.list');
pageLi[0].classList.add("active");
prev.classList.add('disable');
pageRunner(pageLink, itemPerPage, lastPage, pageLi);

function getpagElement(val){
    let pagelink = pageUl.querySelectorAll("li");
    let lastpage =  pagelink.length - 2;
    let pageli = pageUl.querySelectorAll('.list');
    pageli[0].classList.add("active");
    pageRunner(pagelink, val, lastpage, pageli);
}



function pageMaker(index, item_per_page, activePage){
    let start = item_per_page * index;
    let end  = start + item_per_page;
    let current_page =  emptyBox.slice((start - item_per_page), (end-item_per_page));
    tbody.innerHTML = "";
    for(let j=0; j<current_page.length; j++){
        let item = current_page[j];					
        tbody.appendChild(item);
    }
    Array.from(activePage).forEach((e)=>{e.classList.remove("active");});
    activePage[index-1].classList.add("active");
}

/*=====================  Start Num TO From  ===================*/
    let from = document.getElementById('from');
    let to = document.getElementById('to');
    function PrintNum_From_TO (RowNumValue){
        if(itemPerPage > tr.length){
            from.textContent = tr.length + '-';
        }
        else{
            from.textContent = RowNumValue + ' -';
            to.textContent = tr.length;
        }
    
    }
    PrintNum_From_TO(itemPerPage);

/*=====================  End Num TO From  ===================*/

function ActiveSearch (){
    var table_search = document.getElementById('table-search')
    var fillter = table_search.value.toUpperCase();
    var table = document.getElementById('table');
    for(var i= 1; i < tr.length; i++){
        var cells = tr[i].getElementsByTagName('td');
        var found = false;
        for(var a = 0; a < cells.length; a++){
            var cell = cells[a];
            if(cell.innerHTML.toUpperCase().indexOf(fillter) > -1){
                found = true;
                break;
            }
        }
        if(found){
            tr[i].style.display ='';  
        }
        else{
            tr[i].style.display ='none';
        }
    }
}

/*==============  Start الترتبي الابجدي   ============== */

/*==============  End الترتبي الابجدي   ============== */


