
const cloud = document.querySelector(".nombre-pagina")
const barraLateral = document.querySelector(".barra-lateral");
const spans = document.querySelectorAll("span");
const palanca = document.querySelector(".switch");
const circulo = document.querySelector(".circulo");
const menu = document.querySelector(".menu");
const main = document.querySelector("main");



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



// Delete Item

const buttonDelete = document.querySelectorAll("[button-delete]")
if(buttonDelete.length > 0){
    const formDeleteItem = document.querySelector("#form-delete-item")
    const path = formDeleteItem.getAttribute("data-path")
    buttonDelete.forEach(button =>{
        button.addEventListener("click", () =>{
            const isConfirm = confirm("Bạn có muốn xóa bộ phim này")
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

// Delete Item permanently

if(buttonDelete.length > 0){
    const formDeleteItem = document.querySelector("#form-delete-item")
    const path = formDeleteItem.getAttribute("data-path")
    buttonDelete.forEach(button =>{
        button.addEventListener("click", () =>{
            const isConfirm = confirm("Bạn có muốn xóa vĩnh viễn phim này")
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
// Sort
const sort = document.querySelector("[sort]")
if(sort){
    const sortSelect = sort.querySelector("[sort-select]")
    const sortClear = sort.querySelector("[sort-clear]")
    let url = new URL(window.location.href)

    sortSelect.addEventListener("change", (e) =>{
        const value = e.target.value
        const [sortKey,sortValue] = value.split("-")
        url.searchParams.set("sortKey",sortKey)
        url.searchParams.set("sortValue",sortValue)
        
        window.location.href = url.href
    })
    // The selected cho option
    const sortKey = url.searchParams.get("sortKey")
    const sortValue =  url.searchParams.get("sortValue")

    if(sortKey && sortValue){
        const stringSort = `${sortKey}-${sortValue}`

        const optionSelected = sortSelect.querySelector(`option[value=${stringSort}]`)
        optionSelected.selected = true
    }

}

// End Sort

