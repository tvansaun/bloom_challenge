import React, { Component } from 'react';
import './styles.css'

class Catalog extends Component {

	constructor(props){
		super(props)

		this.state = {
			inventory: [],
			cart: []
		}
	}
	
	async componentDidMount() {

		fetch(`http://localhost:4000/inventory`)
			.then((res) => res.json())
			.then((inventory) => this.setState( {inventory: inventory} ));

		console.log(this.state.inventory)
	}

	addToCart = (i) => {
		this.state.cart.push(this.state.inventory[i]);
		console.log(this.state.cart);
	}

	checkout = () => {
		console.log(this.state.cart)
		let itemString = "";
		let total = 0;

		for(let i = 0; i < this.state.cart.length; i++){

			let id = this.state.cart[i].id;
			console.log(id);
			fetch('http://localhost:4000/inventory/update', {
				method: 'post',
				headers: {
	      			'Content-Type': 'application/json'
	      		},
				body: {
					"id": id
				}
			});

			itemString += this.state.cart[i].item_name + ", ";
			total += this.state.cart[i].price;
		}
		itemString = itemString.substring(0, itemString.length-2);

		let order = {
			items: itemString,
			total_price: total
		}

		fetch('http://localhost:4001/order/', {
			method: 'post',
			headers: {
      			'Content-Type': 'application/json'
      		},
			body: JSON.stringify(order)
		});

		

		alert("Order Successful!\nItems: " + itemString + "\nTotal: " + total);
		window.location.replace('http://localhost:3000');
	}

    render() {
        return (
            <div className="row">
            	<div className="col-md-8">
            		<div className="card">
            			<h2 className="card-title">Catalog</h2>
	            		<div className="card-body">
		            		<table className="table" id="catalog">
		            			<thead>
		            				<tr>
			            				<th scope="col">Product Name</th>
			            				<th scope="col"># In Stock</th>
			            				<th scope="col">Price</th>
			            				<th scope="col"></th>
			            			</tr>
		            			</thead>
		            			<tbody>
			            			{this.state.inventory.map((item, i) =>
			            				<tr>
			            					<td>{item.item_name}</td>
			            					<td>{item.quanity}</td>
			            					<td>{item.price}</td>
			            					<td><button onClick={() => this.addToCart(i)} className="btn btn-primary">Add to Cart</button></td>
			            				</tr>
			            			)}
			            		</tbody>
		            		</table>
	            		</div>
            		</div>
            	</div>
            	<div className="col-md-4">
            		<div className="card">
		            	<h2 className="card-title">Cart</h2>
		        		<div className="card-body">
		            		<table className="table" id="catalog">
		            			<thead>
		            				<tr>
			            				<th scope="col">Product Name</th>
			            				<th scope="col">Quantity</th>
			            				<th scope="col">Price</th>
			            			</tr>
		            			</thead>
		            			<tbody>
		            				{this.state.cart.map(item =>
			            				<tr>
			            					<td>{item.item_name}</td>
			            					<td>{item.quanity}</td>
			            					<td>{item.price}</td>
			            				</tr>
			            			)}
			            		</tbody>
		            		</table>
		            		<button onClick={() => this.checkout()} className="btn btn-success">Checkout</button>
		        		</div>
		        	</div>
            	</div>
            </div>
        );
    }
}

export default Catalog;
