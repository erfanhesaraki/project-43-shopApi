const _user = document.getElementById("user");
// console.log(_user.value);
const _pas = document.getElementById("pass");
// console.log(_pas.value);
const _form = document.getElementById("form");

const _pro = document.getElementById("pro");

document.getElementById("set").addEventListener("click", function () {
  _user.value = "kminchelle";
  _pas.value = "0lelplR";
});

_form.addEventListener("submit", function (event) {
  event.preventDefault();

  fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: _user.value,
      password: _pas.value,
    }),
  })
    .then((res) => res.json())
    .then((mydata) => {
      setTimeout(() => {
        if (mydata.username == _user.value) {
          document.getElementById("form").style.opacity = "0";
          document.getElementById("sec-1").style.display = "none";
          document.querySelector(".box").style.display = "none";
          _pro.classList.remove("d-none");
          _pro.classList.add("d-flex");

          // alert("welcom to my website");
        } else {
          document.getElementById("msgform").innerText =
            "Enter for a valid username";
          _user.value = "";
          _pas.value = "";
        }
      }, 1000);
    });
});

let _menuBasket = document.getElementById("menu-basket");

fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((para) => {
    // console.log(para);
    let tepm = para.products;
    tepm.map((val) => {
      // console.log(val);
      let _div = document.createElement("div");
      _div.classList.add("col-3", "mx-1");
      _div.innerHTML += `

      <figure class="col-12   d-flex d-flex justify-content-center align-items-center flex-column ">
          <img src="${val.thumbnail}" alt="phone" class="col-10 ">
      </figure>
      <figcaption class="col-12   d-flex flex-wrap">
              <span class="col-6 d-flex justify-content-center  align-items-center  border-end  py-1 ">${val.brand}</span>
              <span class="col-6 d-flex justify-content-center  align-items-center   py-1 ">${val.title}</span>
              <span class="col-12 d-flex justify-content-center  align-items-center   text-center">${val.description}</span>
              <span class="col-12 d-flex justify-content-center  align-items-center   py-1 ">$${val.price}</span>
              <span class="col-12 d-flex justify-content-center  align-items-center    text-center">
                  <button class="col-7 py-3 text-uppercase" id="basket" onclick="erfan('${val.id}', '${val.thumbnail}' ,'${val.title}' ,'${val.price}' ,this)" data-status='off'> add to basket</button>
              </span>
          </figcaption>

     `;
      document.getElementById("sec-2").appendChild(_div);
    });
  });

let _card = document.getElementById("card");
function erfan(id, img, title, price, self) {
  let productId = `product-${id}`;
  _menuBasket.classList.remove("d-none");
  _menuBasket.classList.add("d-flex");
  _menuBasket.style.opacity = 1;
  const hasExist = document.getElementById(productId);
  if (!hasExist) {
    let _li = document.createElement("li");
    _li.classList.add("col-12", "d-flex", "border");
    _li.id = productId;
    _li.innerHTML = `
    <figure class="col-5 border-right d-flex justify-content-center align-items-center">
    <img src="${img}" alt="" class="col-10 border">
   </figure>
   
    <div class=" d-flex flex-wrap">
    <span class="d-flex col-12 justify-content-end  pe-2  py-0" onclick="removeItem('${productId}')">
    <i class="bi bi-x fs-3 text-danger"></i>
                </span>
                <input type='number' min=0  value=1 class="col-8 mx-auto ">
    <h6 class="col-6 d-flex justify-content-center align-items-center text-uppercase">${title}</h6>
    <strong class="col-6 d-flex justify-content-center align-items-center text-uppercase ">${price}</strong>
   </div>
    `;
    _card.appendChild(_li);
  }
}
const removeItem = (itemId) => {
  const card = document.getElementById("card");
  const selectedItem = document.getElementById(itemId);
  document.getElementById("card").removeChild(selectedItem);

  if (!card.children.length) {
    _menuBasket.style.opacity = 0;
  }
};
