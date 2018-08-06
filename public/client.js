// client-side js
// run by the browser each time your view template is loaded

console.log('hello world :o');

// our default array of dreams
const dreams = [
  'Find and count some sheep',
  'Climb a really tall mountain',
  'Wash the dishes'
];

// define variables that reference elements on  page
const dreamsList = document.getElementById('dreams');
const dreamsForm = document.forms[0];
const dreamInput = dreamsForm.elements['dream'];

// a helper function that creates a list item for a given dream
const appendNewDream = function(dream) {
  const newListItem = document.createElement('li');
  newListItem.innerHTML = dream;
  dreamsList.appendChild(newListItem);
}

// iterate through every jeff and add it to  page
dreams.forEach( function(dream) {
  appendNewDream(dream);
});

// listen for the form to be submitted and add a new jeff when it is
dreamsForm.onsubmit = function(event) {
  // stop our form submission from refreshing the page
  event.preventDefault();

  // get jeff value and add it to the list
  dreams.push(dreamInput.value);
  appendNewDream(dreamInput.value);

  // reset form 
  dreamInput.value = '';
  dreamInput.focus();
};
