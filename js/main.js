let phoneInput = document.getElementById("user_phone_number")
let form = document.querySelector("form")



function checkLocalStorage() {
    let textfields = [...form.querySelectorAll("input:not([type=submit]):not([type=checkbox])")]
    let checkfields = [...form.querySelectorAll("input[type=checkbox]")]
    let select = [...form.querySelectorAll("select")]
    let label = [...form.querySelectorAll("label")]

    if( localStorage.hasOwnProperty("user_mail")) {
        textfields.forEach(e => {
            e.value = localStorage.getItem(e.name)
        });
        checkfields.forEach(e => {
            e.checked = eval(localStorage.getItem(e.name));
        });
        select.forEach(e => {
            e.value = localStorage.getItem(e.name)
        });

        label.forEach(l => {
            if(localStorage.hasOwnProperty(l.htmlFor)) {
                console.log("local : " + l.htmlFor)
                const el = document.createElement("button");
                const ele = document.createElement("button");
                ele.classList.add("localstorage-edit");
                ele.innerText = "Edytuj w local storage";
                el.classList.add("localstorage-delete");
                el.innerText = "Skasuj z local storage";
                el.addEventListener("click", () => {
                    event.preventDefault()
                    localStorage.removeItem(l.htmlFor);
                    el.parentNode.removeChild(el);
                    ele.parentNode.removeChild(ele);
                })
                ele.addEventListener("click", () => {
                    event.preventDefault()
                    let v = document.getElementById(l.htmlFor);
                    if(v.getAttribute("type") == "checkbox") {
                            localStorage.setItem(l.htmlFor,v.checked);
                            alert("Edytowano wartość w localstorage: " + JSON.stringify({"name": l.htmlFor, "value": localStorage.getItem(l.htmlFor)}));
                    } else {
                        if (v.validity.valid) {
                            localStorage.setItem(l.htmlFor,v.value);
                            alert("Edytowano wartość w localstorage: " + JSON.stringify({"name": l.htmlFor, "value": localStorage.getItem(l.htmlFor)}));
                        }
                    }
                });
                l.appendChild(el);
                l.appendChild(ele);
            }
        })
        
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault()
    let textfields = [...form.querySelectorAll("input:not([type=submit]):not([type=checkbox])")]
    let checkfields = [...form.querySelectorAll("input[type=checkbox]")]
    let select = [...form.querySelectorAll("select")]

    let output = [];
    
    textfields.map(e => {
        output.push({"name": e.name,"value": e.value});
    });
    checkfields.map(e => {
        output.push({"name": e.name,"value": e.checked});
    });
    select.map(e => {
        output.push({"name": e.name,"value": e.value});
    });

    output.forEach(element => {
        window.localStorage.setItem(element["name"],element["value"]);
    })

    alert("Dodano elementy do local storage!")
    checkLocalStorage()


});

phoneInput.addEventListener("change", (event) => {
    if(event.target.value.length == 9) {
        phone = event.target.value.replace(/\D\W[^\.]/g, "");
        event.target.value = phone.slice(0,3)+" "+phone.slice(3,6)+" "+phone.slice(6,9);
    } else if (event.target.value.length == 12) {
        phone = event.target.value.replace(/\D\W[^\.]/g, "");
        event.target.value = phone.slice(0,3)+" "+phone.slice(3,6)+" "+phone.slice(6,9) + " " + phone.slice(9,12);
    }
});

checkLocalStorage();