// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products		 

var products = [
	{
		name: "lettuce",
		vegetarian: true,
		glutenFree: true,
        organic: true,
		price: 1.99
	},
	{
		name: "whole wheat bread",
		vegetarian: true,
		glutenFree: false,
        organic: false,
		price: 2.35
	},
	{
		name: "salmon",
		vegetarian: false,
		glutenFree: true,
        organic: true,
		price: 10.00
	},
    {
		name: "ground beef",
		vegetarian: false,
		glutenFree: true,
        organic: false,
		price: 15.49
	},
    {
		name: "potato chips",
		vegetarian: false,
		glutenFree: false,
        organic: false,
		price: 4.30
	},
    {
		name: "mango",
		vegetarian: true,
		glutenFree: true,
        organic: true,
		price: 5.00
	},
    {
		name: "frozen pizza",
		vegetarian: false,
		glutenFree: false,
        organic: false,
		price: 4.99
	},
    {
		name: "tomato",
		vegetarian: true,
		glutenFree: true,
        organic: true,
		price: 0.99
	},
    {
		name: "strawberry",
		vegetarian: true,
		glutenFree: false,
        organic: true,
		price: 5.45
	},
    {
		name: "celery",
		vegetarian: false,
		glutenFree: true,
        organic: true,
		price: 16.00
	}
];
	


// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

function restrictListProducts(prods, restriction) {
	let product_names = [];
	for (let i=0; i<prods.length; i+=1) {
		if ((restriction == "Vegetarian") && (prods[i].vegetarian == true)){
			product_names.push(prods[i].name);
		}
		else if ((restriction == "GlutenFree") && (prods[i].glutenFree == true)){
			product_names.push(prods[i].name);
		}
		else if (restriction == "None"){
			product_names.push(prods[i].name);
		}
	}
	return product_names;
}

// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts) {
	totalPrice = 0;
	for (let i=0; i<products.length; i+=1) {
		if (chosenProducts.indexOf(products[i].name) > -1){
			totalPrice += products[i].price;
		}
	}
	return totalPrice;
}