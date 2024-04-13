
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const dateBtns = $$('.date');
const newFirmBtns = $$('.container-new-firm');
const x = $$('.info-new-firm');
const imgFirm = $$('.img-new-firm');
const form = document.getElementById('p')
const main = document.getElementById('main')
const a = $('.container-result-search')
const singnBtn = document.getElementById('signup_btn')
const loginBtn = document.getElementById('login_btn')
const formLogin = document.getElementById('form-login')

// Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]")
if(buttonPagination){
    const url = new URL(window.location.href)
    buttonPagination.forEach(button =>{
        button.addEventListener("click", ()=>{
            const page = button.getAttribute("button-pagination")

            url.searchParams.set("page",page)
            window.location.href = url.href
        })
    })
}
// End Pagination

// Form Search
const formSearch = document.getElementById("search-form")
if(formSearch){
    let url = new URL(window.location.href)

    formSearch.addEventListener("submit",(e) =>{
        e.preventDefault()
        const keywork = e.target.elements.keywork.value
        if(keywork){
            url.searchParams.set("keywork",keywork)
        }else{
            url.searchParams.delete("keywork")
        }

        window.location.href = url.href
    })
}

// End Form Search
const app = {
    handleEvents: function () {
        const _this = this;

        dateBtns.forEach(function (dateBtn, idx) {
            const newFirmBtn = newFirmBtns[idx];
            dateBtn.onclick = function () {
                $('.date.active-date-time').classList.remove(
                    'active-date-time',
                );
                $('.container-new-firm.active-disable').classList.remove(
                    'active-disable',
                );

                dateBtn.classList.add('active-date-time');
                newFirmBtn.classList.add('active-disable');
            };
        });

        form.onclick = function (e) {
            e.stopPropagation();
            a.classList.remove('visible')
        }

        main.onclick = function () {
            a.classList.add('visible')
        }


        x.forEach(function (firm, idx) {
            const a = imgFirm[idx];
            firm.addEventListener('mouseenter', function () {
                a.classList.add('active-scale-image');
            });

            firm.addEventListener('mouseleave', function () {
                a.classList.remove('active-scale-image');
            });
        });

        // loginBtn.addEventListener('click',function(){
        //     formLogin.method = 'Get';
        //     form.action = '/success'
        // })

        // singnBtn.addEventListener('click',function(){
        //     formLogin.method = 'Post'
        //     form.action = '/store'
        // })

        // Pagination
        
    },

    start: function () {
        this.handleEvents();
    },
};

app.start();