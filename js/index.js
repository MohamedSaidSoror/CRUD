
var products ;

if(localStorage.getItem("productsData") == null)
{
    products = [];
}else{
    products = JSON.parse(localStorage.getItem("productsData"));
    displayData();
}


function addProduct(){

    var productName = document.getElementById('productName').value ;
    var productPrice = document.getElementById('productPrice').value ;
    var productCategory = document.getElementById('productCategory').value ;
    var productDesc = document.getElementById('productDesc').value ;
    
    if(validate(productName,productPrice) && valid(productPrice) == true){
        document.querySelector('.aler-name').style.display = "none";
        document.querySelector('.aler-price').style.display = "none";   
    var product = {name:productName , price:productPrice ,category:productCategory , desc:productDesc}
    if(selectedIndex == -1){
        products.push(product);
    }else{
        products.splice(selectedIndex,1,product);
    }
     
     var prod = localStorage.setItem("productsData",JSON.stringify(products));
     displayData();
     clearInputs();
    }else if(validate(productName) == false && valid(productPrice) == true){
        document.querySelector('.aler-price').style.display = "none";

        document.querySelector('.aler-name').style.display = "block";
    }else if(valid(productPrice) == false && validate(productName) == true){
        document.querySelector('.aler-price').style.display = "block";
        document.querySelector('.aler-name').style.display = "none";

    }else{
        document.querySelector('.aler-price').style.display = "block";
        document.querySelector('.aler-name').style.display = "block";

    }
    
}

function validate(name){
    var nameRegExp = /^[A-Z][a-z]{3,8}$/;
    if(nameRegExp.test(name)){
        
        return true;
    }else
    {
        return false;
    } 
}
function valid(price){
    var priceRegExp = /^[0-9]{3,8}$/;
    if(priceRegExp.test(price)){
        
        return true;
    }else
    {
        return false;
    } 
}
function searchProduct(term)
{
    var temp="";
        for(var i=0 ; i<products.length ; i++){
            
            if(products[i].name.toLowerCase().includes(term.toLowerCase()) || products[i].price.includes(term) || products[i].category.includes(term)){
                temp +=`<tr>
                <td>`+products[i].name+`</td>
                <td>`+products[i].price+`</td>
                <td>`+products[i].category+`</td>
                <td>`+products[i].desc+`</td>
            </tr>`
            }
            
        }
        
        tableBody.innerHTML = temp
}

function displayData()
{
    var tableBody = document.getElementById('tableBody')
    var stock="";
    for(var i = 0 ; i < products.length ; i++)
    {
        stock += "<tr><td>"+products[i].name+"</td><td>"+products[i].price+"</td><td>"+products[i].category+"</td><td>"+products[i].desc+"</td><td><button onclick='clearProduct("+i+")' class='btn btn-danger'>Delete</button></td><td><button onclick='editProduct("+i+")' class='btn btn-warning'>Edit</button></td></tr>"
        
    }
    tableBody.innerHTML = stock;
}
function clearInputs(){
   var inputs = document.getElementsByClassName("form-control");
   for(var i=0; i<inputs.length ; i++){
       inputs[i].value = "";
   }

   
}
function clearProduct(term){
    products.splice(term);
    localStorage.setItem('productsData',JSON.stringify(products));
    displayData();
}
var selectedIndex= -1;
function editProduct(index){
    selectedIndex = index;
    document.getElementById("productName").value = products[index].name;
    document.getElementById("productPrice").value = products[index].price;
    document.getElementById("productCategory").value = products[index].category;
    document.getElementById("productDesc").value = products[index].desc;
    document.getElementById("submit").innerHTML = "Update";
}
