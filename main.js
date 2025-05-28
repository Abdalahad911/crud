// select elements
let title = document.getElementById("title");
let priceInput = Array.from(document.querySelectorAll(".price-inputs input"));
let total = document.querySelector(".total span:last-of-type");
let category = document.getElementById("category");
let createBtn = document.querySelector(".create");
let table = document.querySelector("table tbody");
let reset = document.querySelector(".delete-all");
let rows = document.querySelectorAll("table tbody tr");
let seaechInput = document.getElementById("search");
let searchByTitle = document.querySelectorAll("button")[2];
let searchByCategory = document.querySelectorAll("button")[3];
let count = document.querySelector("#count");

// set ele
let productss = [];

let id = 0;
// show from local storage
function showFromLocal() {
  table.innerHTML = "";
  let products = JSON.parse(window.localStorage.getItem("products"));
  if (window.localStorage.getItem("products")) {
    products.forEach((product) => {
      table.innerHTML += `
  <tr>
    <td class=first>${product.id}</td>
    <td>${product.title}</td>
    <td>${product.price}</td>
    <td>${product.taxes}</td>
    <td>${product.ads}</td>
    <td>${product.discount}</td>
    <td>${product.total}</td>
    <td>${product.category}</td>
    <td class=before-last><span class=up>${product.update}</span></td>
    <td class=last><span class=del>${product.del}</span></td>
  </tr>


  `;

      id = products[products.length - 1].id;
    });
    productss = JSON.parse(window.localStorage.getItem("products"));
    // del();
    reset.innerHTML = `delete all (${products.length})`;
  }
  reset.innerHTML = `delete all (${productss.length})`;
}
showFromLocal();

// get total
priceInput.forEach((input) => {
  input.onfocus = () => {
    input.value = "";
  };

  input.oninput = () => {
    total.innerHTML =
      priceInput[0].value -
      priceInput[1].value -
      priceInput[2].value -
      priceInput[3].value;
  };
});

// create product
createBtn.addEventListener("click", create);
function create() {
  id++;

  let product = {
    id: id,
    title: title.value,
    price: priceInput[0].value,
    taxes: priceInput[1].value,
    ads: priceInput[2].value,
    discount: priceInput[3].value,
    total: total.innerHTML,
    category: category.value,
    update: "update",
    del: "delete"
  };
  if (count.value != "") {
    for (let i = 0; i < count.value; i++) {
      productss.push(product);
    }
  } else {
    alert("please enter count please");
  }

  window.localStorage.setItem("products", JSON.stringify(productss));
  if (JSON.parse(window.localStorage.getItem("products")).length != 0) {
    id = JSON.parse(window.localStorage.getItem("products"));
    id = id[id.length - 1].id;
  }

  let ar = JSON.parse(window.localStorage.getItem("products"));
  // del();
  ar.forEach((e) => {
    e.id = ar.indexOf(e) + 1;
    window.localStorage.setItem("products", JSON.stringify(ar));
  });
  showFromLocal();
}
// window.localStorage.clear();

reset.onclick = () => {
  productss = [];

  window.localStorage.clear();
  table.innerHTML = "";
  reset.innerHTML = `delete all (${productss.length})`;
  id = 0;
};

table.addEventListener("click", del);

function del(e) {
  if (e.target.classList.contains("del")) {
    e.target.parentElement.parentElement.remove();
    let ar = JSON.parse(window.localStorage.getItem("products"));
    ar.forEach((d, i) => {
      if (e.target.parentElement.parentElement.children[0].innerHTML == d.id) {
        ar.splice(i, 1);
        window.localStorage.setItem("products", JSON.stringify(ar));
        productss.splice(i, 1);
      }
    });
    id = JSON.parse(window.localStorage.getItem("products"));
    if (id.length != 0) {
      id = id[id.length - 1].id;
    } else {
      window.localStorage.clear();
    }
    ar.forEach((e) => {
      e.id = ar.indexOf(e) + 1;
      window.localStorage.setItem("products", JSON.stringify(ar));
    });

    search();
  }
  if (e.target.classList.contains("up")) {
    document.querySelector(".create").style.display = "none";
    document.querySelector(".update").style.display = "block";

    title.value = e.target.parentElement.parentElement.children[1].innerHTML;
    priceInput[0].value =
      e.target.parentElement.parentElement.children[2].innerHTML;
    priceInput[1].value =
      e.target.parentElement.parentElement.children[3].innerHTML;
    priceInput[2].value =
      e.target.parentElement.parentElement.children[4].innerHTML;
    priceInput[3].value =
      e.target.parentElement.parentElement.children[5].innerHTML;
    category.value = e.target.parentElement.parentElement.children[7].innerHTML;

    document.querySelector(".update").onclick = () => {
      document.querySelector(".update").style.display = "none";
      document.querySelector(".create").style.display = "block";
      e.target.parentElement.parentElement.children[1].innerHTML = title.value;
      e.target.parentElement.parentElement.children[2].innerHTML =
        priceInput[0].value;
      e.target.parentElement.parentElement.children[3].innerHTML =
        priceInput[1].value;
      e.target.parentElement.parentElement.children[4].innerHTML =
        priceInput[2].value;
      e.target.parentElement.parentElement.children[5].innerHTML =
        priceInput[3].value;
      e.target.parentElement.parentElement.children[6].innerHTML =
        total.innerHTML;
      e.target.parentElement.parentElement.children[7].innerHTML =
        category.value;
    };
  }
}
searchByTitle.addEventListener("click", () => search("title"));
searchByCategory.addEventListener("click", () => search("category"));
function search(va) {
  if (seaechInput.value != "") {
    let ar = JSON.parse(window.localStorage.getItem("products"));
    ar = ar.filter((e) => !e[`${va}`].includes(seaechInput.value));
    Array.from(table.children).forEach((row) => {
      row.style.display = "table-row";
    });
    Array.from(table.children).forEach((e, i) => {
      ar.forEach((d) => {
        if (e.children[0].innerHTML == d.id) {
          // console.log(e.children[0].innerHTML);
          console.log(d.id);
          e.style.display = "none";
        }
      });
    });
  } else showFromLocal();
}
