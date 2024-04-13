
const cloud = document.querySelector(".nombre-pagina")
const barraLateral = document.querySelector(".barra-lateral");
const spans = document.querySelectorAll("span");
const palanca = document.querySelector(".switch");
const circulo = document.querySelector(".circulo");
const menu = document.querySelector(".menu");
const main = document.querySelector("main");


// Xu Ly Navbar
menu.addEventListener("click",()=>{
    barraLateral.classList.toggle("max-barra-lateral");
    if(barraLateral.classList.contains("max-barra-lateral")){
        menu.children[0].style.display = "none";
        menu.children[1].style.display = "block";
    }
    else{
        menu.children[0].style.display = "block";
        menu.children[1].style.display = "none";
    }
    if(window.innerWidth<=320){
        barraLateral.classList.add("mini-barra-lateral");
        main.classList.add("min-main");
        spans.forEach((span)=>{
            span.classList.add("oculto");
        })
    }
});

palanca.addEventListener("click",()=>{
    let body = document.body;
    body.classList.toggle("dark-mode");
    body.classList.toggle("");
    circulo.classList.toggle("prendido");
});

cloud.addEventListener("click",()=>{
    barraLateral.classList.toggle("mini-barra-lateral");
    main.classList.toggle("min-main");
    spans.forEach((span)=>{
        span.classList.toggle("oculto");
    });
});

// End xu ly navbar

// Bo Loc Trang Thai

const buttonStatus = document.querySelectorAll("[button-status]")
if(buttonStatus.length > 0){
    let url = new URL(window.location.href)

    buttonStatus.forEach(button =>{
        button.addEventListener("click", () =>{
            const status = button.getAttribute("button-status")
            if(status){
                url.searchParams.set("status",status)
            }else{
                url.searchParams.delete("status")
            }

            window.location.href = url.href
        })
    })
}
// End Bo Loc

// Form search
const formSearch = document.getElementById("form-search")
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

// End Form search

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

// Checkbox Multi

const checkboxMulti = document.querySelector("[checkbox-multi]")
if(checkboxMulti){
    const inputCheckAll = document.querySelector("input[name = 'checkall']")
    const inputId = document.querySelectorAll("input[name = 'id']")

    inputCheckAll.addEventListener("click", () =>{
        if(inputCheckAll.checked){
            inputId.forEach(input =>{
                input.checked = true
            })
        }
        else{
            inputId.forEach(input =>{
                input.checked = false
            })
        }
    })

    inputId.forEach(input =>{
        input.addEventListener("click", () =>{
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length
            if(countChecked == inputId.length){
                inputCheckAll.checked = true
            }
            else{
                inputCheckAll.checked = false
            }
        })
    })
}

// End Checkbox Multi

// Delete Item

const buttonDelete = document.querySelectorAll("[button-delete]")
if(buttonDelete.length > 0){
    const formDeleteItem = document.querySelector("#form-delete-item")
    const path = formDeleteItem.getAttribute("data-path")
    buttonDelete.forEach(button =>{
        button.addEventListener("click", () =>{
            const isConfirm = confirm("Ban Co Cach Muon Xoa Bo Phim Nay")
            if(isConfirm){
                const id = button.getAttribute("data-id")
                const action = `${path}/${id}?_method=DELETE`
                formDeleteItem.action = action
                formDeleteItem.submit()
            }
        })
    })
}

// End Delete Item

// Form change multi
const formChangeMulti = document.querySelector("[form-change-multi]")
if(formChangeMulti){
    formChangeMulti.addEventListener("submit", (e) =>{
        e.preventDefault()
        const checkboxMulti = document.querySelector('[checkbox-multi]')
        const inputsChecked = checkboxMulti.querySelectorAll("input[name = 'id']:checked")

        const typeChange = e.target.elements.type.value

        if(typeChange == "delete-all"){
            const isConfirm = confirm("Ban xac nhan muon xoa")

            if(!isConfirm){
                return;
            }
        } 

        if(inputsChecked.length){
            let ids = []
            const inputIds = formChangeMulti.querySelector("input[name='ids']")

            inputsChecked.forEach((input) =>{
                const id = input.value


                if(typeChange == "change-position"){
                    const position = input.closest("tr").querySelector("input[name='position']").value

                    ids.push(`${id}-${position}`)
                }
                else{
                    ids.push(id)
                }
                
            })
            inputIds.value = ids.join(", ")
            formChangeMulti.submit()
        }else{
            alert("chon it nhat 1 ban ghi")
        }
    })
}

// End form change multi

// SHow alert

const showAlert = document.querySelector("[show-alert]")
if(showAlert){
    const time = parseInt(showAlert.getAttribute("data-time"))
    closeAlert = showAlert.querySelector("[close-alert]")


    setTimeout(() =>{
        showAlert.classList.add("alert-hidden")
    },time)

    closeAlert.addEventListener("click",() =>{
        showAlert.classList.add("alert-hidden")
    })
    
}

// end show alert

// Upload Image
const uploadImage = document.querySelector("[upload-image]")

const cencelImage = document.querySelector("[cencel-upload]")
if(uploadImage){
    const uploadImageInput = document.querySelector("[upload-image-input]")
    const uploadImagePreview = document.querySelector("[upload-image-preview]")

    uploadImageInput.addEventListener("change", (e) =>{
        const file = e.target.files[0]
        if(file){
            uploadImagePreview.src = URL.createObjectURL(file)
        }
        cencelImage.classList.remove("hidden")
    })

    cencelImage.addEventListener("click", () =>{
        uploadImageInput.value= "" 
        uploadImagePreview.src = ""
        cencelImage.classList.add("hidden")
    })
}



// End Upload Image