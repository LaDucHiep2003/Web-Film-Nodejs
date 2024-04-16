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