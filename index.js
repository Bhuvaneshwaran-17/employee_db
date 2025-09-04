let aform = document.getElementById("form");
let add_button = document.getElementById("add-emp");
let submit_button = document.getElementById("submit-btn");
let name_emp = document.getElementById("name");
let age = document.getElementById("age");
let position = document.getElementById("position");
let emp_list = document.getElementById("employee-list");

let emp_display = document.querySelector(".emp-display");

let arrayobject = JSON.parse(localStorage.getItem("employees")) || {}; 

function showIt() {
    if (aform.style.display == "none" || aform.style.display === "") {
        aform.style.display = "block";
        add_button.style.backgroundColor = "black";
    } else {
        aform.style.display = "none";
        add_button.style.backgroundColor = "red";
    }
}
function updateIt(event) {
    event.preventDefault();

    let name_val = name_emp.value.trim();
     let age_val = age.value.trim();
    let position_val = position.value.trim();

    let alphaRegex = /^[A-Za-z\s]+$/;
    let numberRegex = /^[0-9]+$/;

    if (!name_val || !age_val || !position_val) {
        alert("Please fill all fields before submitting.");
        return;
    }

    if (!alphaRegex.test(name_val)) {
        alert("Name must contain only alphabets.");
        return;
    }

    if (!numberRegex.test(age_val) || parseInt(age_val) <= 0) {
        alert("Age must be a positive number.");
        return;
    }

    if (!alphaRegex.test(position_val)) {
        alert("Position must contain only alphabets.");
        return;
    }

    let list_item = document.createElement('li');
    list_item.classList.add("li-item");
    list_item.dataset.user = name_val;

    let h = document.createElement("h3");
    h.textContent = name_val;

    let img = document.createElement("img");
    img.src = "https://res.cloudinary.com/dx24q59wt/image/upload/v1756910061/close_dcemgo.png";
    img.classList.add("cancel-img");

    list_item.appendChild(h);
    list_item.appendChild(img);
    emp_list.appendChild(list_item);

    let a = {
        emp_name: name_val,
        age: age.value,
        position: position.value
    };
    arrayobject[name_val] = a;

    localStorage.setItem("employees", JSON.stringify(arrayobject));

    name_emp.value = "";
    age.value = "";
    position.value = "";
    aform.style.display = "none";
    add_button.style.backgroundColor = "red";
}

function renderEmployees() {
    emp_list.innerHTML = "";
    Object.values(arrayobject).forEach(emp => {
        let list_item = document.createElement('li');
        list_item.classList.add("li-item");
        list_item.dataset.user = emp.emp_name;

        let h = document.createElement("h3");
        h.textContent = emp.emp_name;

        let img = document.createElement("img");
        img.src = "https://res.cloudinary.com/dx24q59wt/image/upload/v1756910061/close_dcemgo.png";
        img.classList.add("cancel-img");

        list_item.appendChild(h);
        list_item.appendChild(img);
        emp_list.appendChild(list_item);
    });
}

function showDetails(empName) {
    let emp = arrayobject[empName];
    if (!emp) return;
    emp_display.innerHTML = `
        <h1>Employee details</h1>
        <img class="emp-img" src="https://res.cloudinary.com/dx24q59wt/image/upload/v1756910077/man_ovc8fp.png" alt="Employee">
        <h4>${emp.emp_name}</h4>
        <p>${emp.age} years</p>
        <p>${emp.position}</p>
    `;
}

function deleteEmployee(empName, liElement) {
    delete arrayobject[empName];
    localStorage.setItem("employees", JSON.stringify(arrayobject));
    liElement.remove();
    emp_display.innerHTML = `<h1>Employee details</h1><p>Select an employee to view details</p>`;
}

emp_list.addEventListener("click", function (e) {
    if (e.target.tagName === "H3") {
        let empName = e.target.textContent;
        showDetails(empName);
    } else if (e.target.classList.contains("cancel-img")) {
        let li = e.target.closest("li");
        let empName = li.dataset.user;
        deleteEmployee(empName, li);
    }
});

add_button.addEventListener('click', showIt);
submit_button.addEventListener("click", updateIt);

renderEmployees();
