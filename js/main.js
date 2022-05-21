// global varibles
//  get total
// create product
//  save local storage
// clear inputs
// read
//  delete
//  count
//  update
// search
//  clean data or validation

// *************************************************

// global varibles
let title = document.getElementById("title");
let price =  (document.getElementById("price")) ;
let taxes = (document.getElementById("taxes")) ;
let ads = (document.getElementById("ads")) ;
let discount = (document.getElementById("discount")) ;
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let tmp ; 
let search = document.getElementById("search");


//  get total
function getTotal (){
    if(price.value != ""){
        var result = ( Number(price.value)  + Number(taxes.value)  + Number (ads.value) )  - Number(discount.value);
        total.innerHTML = result;
        total.style.backgroundColor = "rgb(32, 188, 32)";
   }else{
       total.innerHTML = "";
       total.style.backgroundColor = "rgb(184, 25, 25)";
   }
}


// create product       //save local storage       //  and count 
let dataPro ; 
if(localStorage.product != null){
dataPro = JSON.parse(localStorage.product);
}else{
    dataPro = []; 
}

submit.onclick = function (){
    let newProduct = {
        title :  title.value.toLowerCase(), 
        price :   price.value , 
        taxes : taxes.value , 
        ads : ads.value , 
        discount : discount.value , 
        total : total.innerHTML , 
        count : count.value ,
        category : category.value.toLowerCase() , 
    }


    if(title.value != "" && price.value != "" && category.value != "" ){
           if(mood === "create" ){
         if (newProduct.count > 1 && newProduct.count <= 100) {
           for (let i = 0; i < newProduct.count; i++) {
             dataPro.push(newProduct);
           }
         } else {
           dataPro.push(newProduct);
         }
         
    }else{
        dataPro[tmp] = newProduct ;
        mood = "create" ; 
        count.style.display = "block";
        submit.innerHTML = "Create"; 
    }
    clearData();
    }
 
   

    localStorage.setItem("product", JSON.stringify(dataPro));
    
    showData();
}



// clear inputs
function clearData () {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}



// read

function showData (){
     let table = "" ; 
     for(let i =0 ; i < dataPro.length ; i++){
        table += `<tr>
           <td>${i+1}</td>
           <td>${dataPro[i].title}</td>
           <td>${dataPro[i].price}</td>
           <td>${dataPro[i].taxes}</td>
           <td>${dataPro[i].ads}</td>
           <td>${dataPro[i].discount}</td>
           <td>${dataPro[i].total}</td>
           <td>${dataPro[i].category}</td>
           <td ><button id="update" onclick="updateData(${i})" class="text-white border-primary border-0  " >update</button></td>
           <td ><button id="delete" onclick="deleteData(${i})"  class="text-white border-primary border-0  ">delete</button></td>
         </tr>`;
     }

     document.getElementById("tBody").innerHTML = table;
      let btnDelete = document.getElementById("deleteAll");
     if(dataPro.length > 0 ){
        btnDelete.innerHTML = `<button onclick="deleteAll()" class="btn form-control mt-3 mb-3 text-white">Delete All (${dataPro.length})</button>`;
      }else{
          btnDelete.innerHTML = ""; 
      }
      getTotal();
}

showData();



//  delete 

function deleteData (i){
    dataPro.splice(i , 1);
    localStorage.setItem("product" , JSON.stringify(dataPro));
    // localStorage.product = JSON.stringify(dataPro);
    showData();
}


function deleteAll (){
   localStorage.clear();
   dataPro.splice(0);
   showData();
}


//  update 


function updateData(i){
   title.value = dataPro[i].title ; 
   price.value = dataPro[i].price ; 
   taxes.value = dataPro[i].taxes ; 
   ads.value = dataPro[i].ads ; 
   discount.value = dataPro[i].discount ; 
   category.value = dataPro[i].category ; 
    getTotal();
    count.style.display = "none";
    submit.innerHTML = "Update"; 
    mood = "update";
    tmp = i ; 
   scroll({
       top : 0 , 
       behavior : "smooth" ,
   })
}




// search

let searchMood = "title" ; 
function getSearchMood (id){
    let search = document.getElementById("search");
    search.focus();
if(id == "searchTitle"){
    searchMood = "title" ;
}else{
    searchMood = "category";
}
search.placeholder = "Search by " + searchMood;
search.value = "";
showData();
}

function searchData (value){
    let table = "";
if(searchMood == "title"){

    for(let i =0 ; i<dataPro.length; i++){
        if(dataPro[i].title.includes(value.toLowerCase())){
            table += `<tr>
          <td>${i}</td>
          <td id="myId">${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
           <td>${dataPro[i].taxes}</td>
           <td>${dataPro[i].ads}</td>
           <td>${dataPro[i].discount}</td>
           <td>${dataPro[i].total}</td>
          <td>${dataPro[i].category}</td>
           <td ><button id="update" onclick="updateData(${i})" class="text-white border-primary border-0  " >update</button></td>
           <td ><button id="delete" onclick="deleteData(${i})"  class="text-white border-primary border-0  ">delete</button></td>
         </tr>`;
        }
      
    }
}else{
 
      for (let i = 0; i < dataPro.length; i++) {
        if (dataPro[i].category.includes(value.toLowerCase())) {
          table += `<tr>
          <td>${i}</td>
          <td id="myId">${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
           <td>${dataPro[i].taxes}</td>
           <td>${dataPro[i].ads}</td>
           <td>${dataPro[i].discount}</td>
           <td>${dataPro[i].total}</td>
          <td>${dataPro[i].category}</td>
           <td ><button id="update" onclick="updateData(${i})" class="text-white border-primary border-0  " >update</button></td>
           <td ><button id="delete" onclick="deleteData(${i})"  class="text-white border-primary border-0  ">delete</button></td>
         </tr>`;
        }
      }
}
   document.getElementById("tBody").innerHTML = table;
}







