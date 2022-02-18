function adjustQueryParameter(element) {
    const urlParams = new URLSearchParams(window.location.search);
    if (element.className === "category") {
        urlParams.set('category', element.id);
        if(urlParams.get('name') === null) {
            urlParams.set('name', '%')
        }
    }
    if (element.id === "searchbutton") {
        const input = document.getElementById("searchbar");
        urlParams.set('name', input.value);
        if(urlParams.get('category') === null) {
            urlParams.set('category', '%')
        }
    }
    console.log(urlParams.toString())
    window.location.href = "/results?category=" + urlParams.get('category') + "&name=" + urlParams.get('name');
}