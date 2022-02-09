let products;
fetch('/products').then(result => result.json()).then(json => {
    products = json.payload;
    let container = document.getElementById('product-container');
    products.forEach(product => {
        let card = document.createElement('div');
        card.setAttribute('class', 'product-card');
        let name = document.createElement('p');
        name.setAttribute('class', 'product-text');
        name.innerHTML = product.name;
        let price = document.createElement('p');
        price.setAttribute('class', 'product-text');
        price.innerHTML = product.price;
        let img = document.createElement('img');
        img.src = product.thumbnail;
        card.append(name);
        card.append(price);
        card.append(img);
        container.append(card);
    })
})

let form = document.getElementById('productForm');
const handleSubmit = (evt, form, route) => {
    evt.preventDefault();
    let formData = new FormData(form);
    fetch(route, {
        method: "POST",
        body: formData
    }).then(result => result.json().then(json => console.log(json)))
    form.reset();


}

form.addEventListener('submit', (e) => handleSubmit(e, e.target, '/products'))