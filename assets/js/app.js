const cl = console.log;

let stdForm = document.getElementById('stdForm');
let fnameControl = document.getElementById('fname');
let lnameControl = document.getElementById('lname');
let emailControl = document.getElementById('email');
let contactControl = document.getElementById('contact');
let stdContainer = document.getElementById("stdContainer");
let updateBtn = document.getElementById("updateBtn");


let stdArray = [
    // {
    //     fname : "gbwq",
    //     lname : "dbga",
    //     email : "sabjx",
    //     contact : 123456,
    // }
    {
        fname: 'saadx',
        lname: 'asad',
        email: 'vsdcvxb',
        contact: 12334,
    },
];

const uuid = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;

        return value.toString(16);
    });
};

const onEdit = (ele) => {
    // cl('edited',ele)
    // let getId = ele.getAttribute('data-id');
    let getId = ele.dataset.id
    cl(getId)
    localStorage.setItem("setEditId", getId);
    let getObj = stdArray.find(obj => obj.id === getId);
    cl(getObj)

    fnameControl.value = getObj.fname;
    lnameControl.value = getObj.lname;
    emailControl.value = getObj.email;
    contactControl.value = getObj.contact;
    submitBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');

};

const onDelete = (ele) => {
    cl('Deleted')
    // let deleteId = ele.getAttribute("data-id");
    let deleteId = ele.dataset.id
    cl(deleteId);
    stdArray = stdArray.filter(obj => obj.id !== deleteId);
    // localStorage.setItem("setStdInfo",JSON.stringify(stdArray));
    setStdArray();
    // tempalating(stdArray)
    ele.parentElement.parentElement.remove();
};

const tempalating = () => {
    let result = '';
    stdArray.forEach((std, i) => {
        result += `
        <tr>
            <td>${i + 1}</td>
            <td>${std.fname}</td>
            <td>${std.lname}</td>
            <td>${std.email}</td>
            <td>${std.contact}</td>

            <td><button class = "btn btn-primary" data-id = "${std.id}" onclick="onEdit(this)">Edit</button></td>
            <td><button class = "btn btn-danger" data-id = "${std.id}" onclick="onDelete(this)">Delete</button></td>
        </tr>
    `
    });

    stdContainer.innerHTML = result;
};
if (localStorage.getItem("setStdInfo")) {
    stdArray = JSON.parse(localStorage.getItem("setStdInfo"));
    tempalating(stdArray);
}
const onStdSubmit = (eve) => {
    eve.preventDefault();
    //cl('submitted')
    let obj = {
        fname: fnameControl.value,
        lname: lnameControl.value,
        email: emailControl.value,
        contact: contactControl.value,
        id: uuid()
    }
    stdArray.push(obj);
    cl(stdArray)
    // localStorage.setItem("setStdInfo",JSON.stringify(stdArray))
    setStdArray();
    stdForm.reset()
};

const onStdUpdate = (eve) => {
    let getUpdateId = localStorage.getItem("setEditId");
    cl(getUpdateId)
    stdArray.forEach(obj => {
        if (obj.id === getUpdateId) {
            obj.fname = fnameControl.value;
            obj.lname = lnameControl.value;
            obj.email = emailControl.value;
            obj.contact = contactControl.value;
        }
    })
    // localStorage.setItem("setStdInfo",JSON.stringify(stdArray));
    setStdArray();
    // cl(document.querySelector(`[data-id = ${getUpdateId}]`).closest('tr'))
    tempalating(stdArray);
    submitBtn.classList.remove('d-none');
    updateBtn.classList.add('d-none');
    stdForm.reset();
}

function setStdArray() {
    localStorage.setItem("setStdInfo", JSON.stringify(stdArray))
};

updateBtn.addEventListener("click", onStdUpdate);
stdForm.addEventListener('submit', onStdSubmit);
