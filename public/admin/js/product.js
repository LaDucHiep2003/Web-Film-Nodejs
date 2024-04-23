// Stored
const buttonStored = document.querySelectorAll("[button-stored]")
if(buttonStored.length > 0){
    const formStoredItem = document.getElementById("form-stored-item")
    const path = formStoredItem.getAttribute("data-path")
    buttonStored.forEach(button =>{
        button.addEventListener("click", () =>{
            const isConfirm = confirm("Ban Co Cach Muon Khoi Phuc Bo Phim Nay")
            if(isConfirm){
                const id = button.getAttribute("data-id")
                const action = `${path}/${id}?_method=PATCH`
                formStoredItem.action = action
                formStoredItem.submit()
            }
        })
    })
}

// End Stored


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