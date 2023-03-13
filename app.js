const addBtn = document.querySelector("#addprice");
const titleInput = document.querySelector(".item");
const priceInput = document.querySelector(".price");
const quantityInput = document.querySelector(".quantity");
const totalDiv = document.querySelector(".items-div");
const generateBtn = document.querySelector(".generate");
const months = ["january", "february", "March", "April",   "May", "June", "july", "August", "September", "November", "December"]

const items = [];

//onclick of add button 
addBtn.addEventListener("click", (e)=>{
    e.preventDefault();

    let titleTag = titleInput.value;
    let priceTag = priceInput.value;
    let quantityTag = quantityInput.value;

    if(titleTag === "" || priceTag === "" || quantityTag === ""){
        return false;
    } 
    let cartItems = {
        title: titleTag,
        price: priceTag,
        quantity: quantityTag,
        totalP : priceTag * quantityTag,
    };
    titleInput.value = "";
    priceInput.value = "0";
    quantityInput.value = "1"

    items.push(cartItems);
    showCart();
    generateInvoice();
    DateObj();
});

//showing items on DOM
const showCart = ()=>{
    
    totalDiv.innerHTML = items.map((item, index)=>{
        return `
        <div class="item d-flex align-items-center justify-content-between bg-primary py-2 px-3 my-3">
            <p>${item.title}</p>
            <p>${item.price} X ${item.quantity}</p>
            <button class=" btn btn-danger" onclick = "delItems(${index})">X</button>
        </div>
        `
    }).join("");


    const arrayOfPrice = items.map((item)=> item.price * item.quantity);

    const totalPrice= arrayOfPrice.reduce((a,b) => a + b, 0);

    document.querySelector(".total").innerHTML = `total: $${totalPrice}.00`;
}

showCart();

//deleting an item from item list
const delItems = (itemId)=>{
    items.splice(itemId, 1);
    showCart();
    generateInvoice();
}



//gnerating invoice

generateBtn.addEventListener("click", ()=>{
    const invoice = document.querySelector(".invoice");
    const hero = document.querySelector(".hero");
    const loader = document.querySelector(".loader-div");
    
    hero.classList.add("show");
    invoice.classList.add("show");
    loader.classList.add("show");

    setTimeout(()=> loader.remove(), 2000)
});

const generateInvoice = ()=>{
    document.querySelectorAll("td").forEach((td)=> td.remove());
    items.forEach((item)=>{
       const invoiceDiv = document.querySelector(".invoice-body");
       const row =  document.createElement("tr");

       row.innerHTML = `
            <td>${item.title}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td>${item.totalP}</td>
       `;


       invoiceDiv.appendChild(row);

       const arrayOfPrice = items.map((item)=> item.price * item.quantity);
        const totalPrice = arrayOfPrice.reduce((a,b) => a + b, 0);

        document.querySelector(".total-invoice").innerHTML = `total: $${totalPrice}.00`;
    });
}

generateInvoice();

//getting the exact date

const DateObj = ()=>{
    let dateObj = new Date();
    month = months[dateObj.getMonth()];
    days = dateObj.getDay();
    years = dateObj.getFullYear();
    const date = document.querySelector("#date");
    date.innerHTML = `${month}, ${days} ${years}`;
};