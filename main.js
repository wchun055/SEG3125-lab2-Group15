// This function is called when any of the tab is clicked
// It is adapted from https://www.w3schools.com/howto/howto_js_tabs.asp

function openInfo(evt, tabName) {

	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";

}
	
// This function is called when the "Add selected items to cart" button in clicked
// The purpose is to build the HTML to be displayed (a Paragraph) 
// We build a paragraph to contain the list of selected items, and the total price

function selectedItems(){
	
	var ele = document.getElementsByName("product");
	var chosenProducts = [];
	
	var c = document.getElementById('displayCart');
	c.innerHTML = "";
	
	// build list of selected item
	var para = document.createElement("P");
	para.innerHTML = "You selected : ";
	para.appendChild(document.createElement("br"));
	for (i = 0; i < ele.length; i++) { 
		if (ele[i].checked) {
			para.appendChild(document.createTextNode(ele[i].value));
			para.appendChild(document.createElement("br"));
			chosenProducts.push(ele[i].value);
		}
	}
		
	// add paragraph and total price
	c.appendChild(para);
	c.appendChild(document.createTextNode("Total Price is " + getTotalPrice(chosenProducts)));
		
}

// Update the product tab HTML to have the correct products only.
function populateProductList(prodList, accesibility){
    var displayProduct = document.getElementById("displayProduct");
    displayProduct.innerHTML = "";
		
	for (const item of prodList){
		var productName = item["name"];
		var checkbox = document.createElement("input");

		checkbox.type = "checkbox";
		checkbox.name = "product";
		checkbox.value = productName;

		displayProduct.appendChild(checkbox);
		
		if (accesibility["image"] == true){ // If the image setting is selected, replace labels with images.
			var imageLabel = document.createElement('img');
			
			imageLabel.htmlFor = productName;
			imageLabel.style.backgroundImage = "url(" + item["image"] + ")";

			displayProduct.appendChild(imageLabel);

			var br = document.createElement("br");
			br.style.marginBottom = "50pt"; // To ensure that multiple images are not stuck together we add some margin space per product option.

			displayProduct.appendChild(br);   
		}

		else{
			var label = document.createElement('label')
			
			if (accesibility["largeFont"] == true){ // If the large font setting is selected, ensure labels have large font size.
				label.style.fontSize = "20pt";
			}

			label.htmlFor = productName;
			label.appendChild(document.createTextNode(productName));

			displayProduct.appendChild(label);
			displayProduct.appendChild(document.createElement("br"));    
		}
	}
}

// Creating a product list that adheres to the customer diet/profile.
function updateProducts(diet, accesibility){
	updatedProductSet = new Set([]); // Using a set to avoid duplicate additions.
	updatedProduct = [];
	toCheck = [];

	var products = [
	{
		name: "lettuce",
		vegetarian: true,
		glutenFree: true,
        organic: true,
		image: "assets/lettuce.jpg",
		price: 1.99
	},
	{
		name: "whole wheat bread",
		vegetarian: true,
		glutenFree: false,
        organic: false,
		image: "assets/whole-wheat-bread.jpg",
		price: 2.35
	},
	{
		name: "salmon",
		vegetarian: false,
		glutenFree: true,
        organic: true,
		image: "assets/salmon.jpg",
		price: 10.00
	},
    {
		name: "ground beef",
		vegetarian: false,
		glutenFree: true,
        organic: false,
		image: "assets/ground-beef.jpg",
		price: 15.49
	},
    {
		name: "potato chips",
		vegetarian: false,
		glutenFree: false,
        organic: false,
		image: "assets/potato-chips.jpg",
		price: 4.30
	},
    {
		name: "mango",
		vegetarian: true,
		glutenFree: true,
        organic: true,
		image: "assets/mango.png",
		price: 5.00
	},
    {
		name: "frozen pizza",
		vegetarian: false,
		glutenFree: false,
        organic: false,
		image: "assets/frozen-pizza.jpg",
		price: 4.99
	},
    {
		name: "tomato",
		vegetarian: true,
		glutenFree: true,
        organic: true,
		image: "assets/tomato.jpg",
		price: 0.99
	},
    {
		name: "strawberry",
		vegetarian: true,
		glutenFree: false,
        organic: true,
		image: "assets/strawberry.jpg",
		price: 5.45
	},
    {
		name: "celery",
		vegetarian: false,
		glutenFree: true,
        organic: true,
		image: "assets/celery.jpg",
		price: 16.00
	}
];

	for (let key in diet){
		if (diet[key] == true){
			toCheck.push(key);
		}
	}

	for (let i = 0; i < products.length; i++){
		for (let j = 0; j < toCheck.length; j++){
			if (products[i][toCheck[j]] == true){
				updatedProductSet.add(products[i]);
			}
			else{
				updatedProductSet.delete(products[i]);
				break;
			}
		}
	}

	updatedProduct = Array.from(updatedProductSet);
	
	if (accesibility["sortLow"] == true){
		updatedProduct.sort((a, b) => a.price - b.price);
	}

	populateProductList(updatedProduct, accesibility) // Populate the HTML with the updated product list.
}

// Check which choices were made on profile.
// Have a diet list and a accesibility list.
function saveProfile(){
    event.preventDefault();

	const veggieCheck = document.getElementById("veggieCheck");
	const glutenCheck = document.getElementById("glutenCheck");
	const organicCheck = document.getElementById("organicCheck");
	const fontCheck = document.getElementById("fontCheck");
	const imageCheck = document.getElementById("imageCheck");

	var diet = {
		vegetarian : false,
		glutenFree : false,
		organic : false,
	};

	var accesibility = {
		largeFont : false,
		image : false,
		sortLow : false
	}

	if (veggieCheck.checked){
		diet["vegetarian"] = true;
	}

	if (glutenCheck.checked){
		diet["glutenFree"] = true;
	}

	if (organicCheck.checked){
		diet["organic"] = true;
	}

	if (fontCheck.checked){
		accesibility["largeFont"] = true;
	}

	if (imageCheck.checked){
		accesibility["image"] = true;
	}

	if (sortLow.checked){
		accesibility["sortLow"] = true;
	}

	updateProducts(diet, accesibility); // Call with our specific diet list to update the product list.
	
}

//When the customer submits their profile, we begin updating their product list.
document.getElementById("customerSubmit").addEventListener("click", saveProfile); 
