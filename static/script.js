function incdecrement(updateFunction, field, step) {
    return function(event) {
	event.preventDefault();

	console.log("incdecrement", event.type);

	var value = parseInt(field.value);
	value += step;

	var max = field.getAttribute("max");
	var min = field.getAttribute("min");

	if(max != null) {
	    value = Math.min(value, parseInt(max));
	}

	if(min != null) {
	    console.log(value, parseInt(min));
	    value = Math.max(value, parseInt(min));
	}

	field.value = String(value);

	updateFunction();
    };
};

function computeRecipe(fieldNumberOfPizzas, fieldWeightDoughBall, fieldWater, fieldFreshYeast, fieldDryYeast, resultFlour, resultWater, resultSalt, resultYeast) {
    return function() {
	var yeastConversion = 1;
	var yeastDecimals = 1;
	if(fieldDryYeast.checked) {
	    yeastConversion = (14/50);
	    yeastDecimals = 2;
	}

	var totalWeight = fieldNumberOfPizzas.value * fieldWeightDoughBall.value;
	var weightFlour = totalWeight / 1.7125; // magic conversion from the math
	var weightWater = weightFlour * (fieldWater.value / 100);
	var weightSalt = weightFlour * 0.03; // 3% salt
	var weightYeast = weightFlour * 0.0025 * yeastConversion; // 0.25% fresh yeast

	resultFlour.innerHTML = String(roundToDecimals(weightFlour, 0));
	resultWater.innerHTML = String(roundToDecimals(weightWater, 0));
	resultSalt.innerHTML = String(roundToDecimals(weightSalt, 0));
	resultYeast.innerHTML = String(roundToDecimals(weightYeast, yeastDecimals));
    }
}

document.addEventListener("DOMContentLoaded", function(event) {

    var fieldFreshYeast = document.getElementById("field-fresh-yeast");
    var fieldDryYeast = document.getElementById("field-dry-yeast");
    var fieldNumberOfPizzas = document.getElementById("field-number-of-pizzas");
    var fieldWeightDoughBall = document.getElementById("field-weight-dough-ball");
    var fieldWater = document.getElementById("field-water");

    var resultFlour = document.getElementById("result-flour");
    var resultWater = document.getElementById("result-water");
    var resultSalt = document.getElementById("result-salt");
    var resultYeast = document.getElementById("result-yeast");

    var updateFunction = computeRecipe(fieldNumberOfPizzas, fieldWeightDoughBall, fieldWater, fieldFreshYeast, fieldDryYeast, resultFlour, resultWater, resultSalt, resultYeast);

    document.getElementsByTagName("form")[0].addEventListener("submit", function(e) {
	e.preventDefault();
	if(e.submitter.getAttribute("id") == "catcher") {
	    console.log("ignored");
	} else {
	    console.log("form", e.type, e);
	}
	updateFunction();
    });

    document.getElementById("number-of-pizzas-decrement").addEventListener("click", incdecrement(updateFunction, fieldNumberOfPizzas, -1))
    document.getElementById("number-of-pizzas-increment").addEventListener("click", incdecrement(updateFunction, fieldNumberOfPizzas, 1))

    document.getElementById("weight-dough-ball-decrement").addEventListener("click", incdecrement(updateFunction, fieldWeightDoughBall, -5))
    document.getElementById("weight-dough-ball-increment").addEventListener("click", incdecrement(updateFunction, fieldWeightDoughBall, 5))

    document.getElementById("water-decrement").addEventListener("click", incdecrement(updateFunction, fieldWater, -1))
    document.getElementById("water-increment").addEventListener("click", incdecrement(updateFunction, fieldWater, 1))

    fieldFreshYeast.addEventListener("change", updateFunction);
    fieldDryYeast.addEventListener("change", updateFunction);

    updateFunction();
})


// --------------------------------------------------
// Helpers
function roundToDecimals(number, decimals) {
    var p = Math.pow(10, decimals);
    return Math.round((number + Number.EPSILON) * p) / p;
}
