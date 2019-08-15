// TODO: Build an awesome garage!
const url = "https://wagon-garage-api.herokuapp.com/293/cars";

const form = document.querySelector("#new-car");
const carsList = document.querySelector(".cars-list");

const brand = document.querySelector("#brand");
const model = document.querySelector("#model");
const owner = document.querySelector("#owner");
const plate = document.querySelector("#plate");

const appendCar = (car) => {
	const item = `<div class="car" data-Id="${car.id}">
									<div class="car-image">
										<img src="http://loremflickr.com/280/280/${car.brand} ${car.model}" />
									</div>
									<div class="car-info">
										<h4>${car.brand} ${car.model}</h4>
										<p><strong>Owner:</strong> ${car.owner}</p>
										<p><strong>Plate:</strong> ${car.plate}</p>
										<button>Delete Car</button>
									</div>
								</div>`
	carsList.insertAdjacentHTML("beforeend", item);
}

const fetchCars = () => {
	fetch(url)
	.then(response => response.json())
	.then((data) => {
		data.forEach(appendCar);
		deleteCars();
	})
}

fetchCars();

form.addEventListener("submit", (event) => {
	event.preventDefault();	
	const newCar = {
	    brand: brand.value,
	    model: model.value,
	    owner: owner.value,
	    plate: plate.value
	  }

	fetch(url, {
		method: "POST", 
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(newCar)
	})
	.then(response => response.json())
	.then((data) => {
		console.log(data)
		appendCar(data);
		// Erase all values on the inputs
		brand.value = '';
		model.value = '';
		owner.value = '';
		plate.value = '';

		brand.focus(); // focus on first input
	})
}); 



// Special Delete Cars function
const deleteCars = () => {
	const deleteButtons = document.querySelectorAll('button');

	deleteButtons.forEach((button) => {
		button.addEventListener('click', (event) => {
			const carId = event.currentTarget.closest('.car').dataset.id

			fetch('https://wagon-garage-api.herokuapp.com/cars/' + carId, {
				method: 'DELETE'
			})
				.then(response => response.json())
				.then((data) => {
					console.log(data);
					document.querySelector(`.car[data-id="${data.id}"]`).remove();
				})

		})
	})
}