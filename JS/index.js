var bookmarkNameInput = document.getElementById('BookmarkName');
var bookmarkURLInput = document.getElementById('bookmarkURL');
var tableData =document.getElementById('tableData');
var addBtn =document.getElementById('addBtn');
var setFormBtn = document.getElementById('setFormBtn');
var mm =document.getElementById('mm');
var closeBtn =document.getElementById('closeBtn');
var temp;


var siteItems;
if(localStorage.getItem('site')!=null){
    siteItems=JSON.parse(localStorage.getItem('site'));
    displayData();
}else{
    siteItems = [];
}

function addSite(){
    var site={
        name: bookmarkNameInput.value,
        url: bookmarkURLInput.value
    }

    if (bookmarkNameInput.classList.contains('is-valid')&&
    bookmarkURLInput.classList.contains('is-valid')) {
        siteItems.push(site);
        localStorage.setItem('site',JSON.stringify(siteItems))
        clear();
        displayData();
        bookmarkNameInput.classList.remove('is-valid');
        bookmarkURLInput.classList.remove('is-valid');
        alertForm.classList.add('d-none');


}else{
    mm.classList.remove('d-none')

} 
}
function  closeModal(){
    
  mm.classList.add('d-none');
}  

function clear() {
    bookmarkNameInput.value=null;
    bookmarkURLInput.value=null;
}

function displayData(){



    var box='';
    for(var i=0; i<siteItems.length; i++){
        box+=`<tr>
        <td>${i+1}</td>
        <td>${siteItems[i].name}</td>
        <td><a href="${siteItems[i].url}" target="_blank" text-decoration-none text-white>
        <button class="btn btn-visit" ) >
        <i class="fa-solid fa-eye pe-2"></i>
        Visit</button>
        </td>
        </a>
       

        <td><button class="btn btn-light" onclick="(setFormForUpdate(${i}))"  >
        <i class="fa-solid fa-refresh"></i>
        Update</button>
        </td>

        <td><button class="btn btn-danger"  onclick="(deleteSite(${i}))">
        <i class="fa-solid fa-trash-can"></i>
        Delete</button>
        </td>
        </tr>`
    }
    tableData.innerHTML=box;
}

function deleteSite(indexCounter){
    siteItems.splice(indexCounter,1);
    localStorage.setItem('site',JSON.stringify(siteItems))
    displayData();
}
function visit(indexCounter){
    window.open(siteItems[indexCounter].url);
}

function setFormForUpdate(indexCounter){
    addBtn.classList.add('d-none');
    setFormBtn.classList.remove('d-none');

    bookmarkNameInput.value=siteItems[indexCounter].name;
    bookmarkURLInput.value=siteItems[indexCounter].url;

    temp=indexCounter;
}

function updateSite() {
siteItems[temp].name=bookmarkNameInput.value;
siteItems[temp].url=bookmarkURLInput.value;
localStorage.setItem('site',JSON.stringify(siteItems));
    displayData(siteItems);
    addBtn.classList.remove('d-none');
    setFormBtn.classList.add('d-none');

bookmarkNameInput.value=null;
bookmarkURLInput.value=null;
}

function validateInputs(element) {
    var regex={
        BookmarkName: /^\w{3,}(\s+\w+)*$/,
        bookmarkURL:/^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/
    };
    if (regex[element.id].test(element.value)) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        element.nextElementSibling.classList.add('d-none');


        
    }else{
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        element.nextElementSibling.classList.remove('d-none');
    }
}
