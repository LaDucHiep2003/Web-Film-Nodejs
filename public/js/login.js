const singnBtn = document.getElementById('signup_btn')
const loginBtn = document.getElementById('login_btn')
const form = document.getElementById('form-login')

loginBtn.addEventListener('click',function(){
    form.action = '/success'
})

singnBtn.onclick = function(e){
    form.action = '/stored'
}