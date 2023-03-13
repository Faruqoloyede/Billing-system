const addBtn = document.querySelector("#addprice");
const titleInput = document.querySelector(".item");
const priceInput = document.querySelector(".price");
const quantityInput = document.querySelector(".quantity");


const items = [];
//show on Dom

const showCart = ()=>{
    document.querySelectorAll("td").forEach((td)=> td.remove());
    items.forEach((item, index)=>{
        const list = document.querySelector("#item-list");
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${item.title}</td>
        <td>${item.price}</td>
        <td>${item.quantity}</td>
        <td class ="btn btn-danger bg-danger my-2" onclick = "delItem(${index})">X</td>
        `;
        list.appendChild(row);
    });

    const arrayOfPrice = items.map((item)=> item.price * item.quantity);
    const totalPrice = arrayOfPrice.reduce((a,b) => a + b, 0);

    document.querySelector(".total").innerHTML = `total: $${totalPrice}.00`;
}

showCart();

const delItem = (itemId)=>{
    let comDel = confirm("are you sure");

    if(!comDel){
        return
    }
    items.splice(itemId, 1);
    localStorage.setItem("items", JSON.stringify(items));
    showCart();
}


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
    };
    titleInput.value = "";
    priceInput.value = "0";
    quantityInput.value = "1"

    items.push(cartItems);
    showCart();
});