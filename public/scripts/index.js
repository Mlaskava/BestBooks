function fillCategoriesAndProducts() {
    const categories = new XMLHttpRequest();
    const products = new XMLHttpRequest();

    categories.open("GET", "http://localhost:3000/categories", true);
    categories.send();

    products.open("GET", "http://localhost:3000/products", true);
    products.send();

    categories.onload = () => {
        const categoriesList = document.getElementById("categories");
        const categoriesJSON = JSON.parse(categories.response);

        categoriesJSON.forEach(json => {
            const element = document.createElement("a");
            element.setAttribute("href", "categories/" + json.category_id);
            element.innerHTML = json.name;
            categoriesList.appendChild(element);
        });

    }

    products.onload = () => {
        const productsList = document.getElementsByClassName("grid-container")[0];
        const productsJSON = JSON.parse(products.response);
        productsJSON.forEach(json => {
            console.log(json)
            const a = document.createElement("a");
            const img = document.createElement("img");
            const prize = document.createElement("p");
            const name = document.createElement("p");
            a.setAttribute("class", "grid-item");
            a.setAttribute("href", "products/" + json.product_id);
            img.setAttribute("src", "../images/" + json.img_name);
            prize.setAttribute("class", "prize");
            prize.innerHTML = json.prize + "ZŁ";
            name.setAttribute("class", "name");
            name.innerHTML = json.name;
            a.append(img, prize, name);
            productsList.appendChild(a);
        });
    }
}