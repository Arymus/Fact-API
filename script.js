// Asynchronous function that gets data from an API
async function fetchApi() {
    let error = null; // Error shouldn't exist, therefore it is null
    let facts = []; // The fact will be put in an array for handling, but right now it is empty
    
    try {
        const response = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random"); // Fetch the fact from the URL of the API
        if (!response.ok) throw new Error("HTTP error! Status: " + response.status.toString()); // Throw an error containing the HTTP status as a string if the HTTP response isn't 200 (OK)
        facts = await response.json(); // Parse the facts into JSON format
        
    // Catch any errors, the error being represented as e
    } catch(e) {error = "Failed to fetch fact: " + e.message}; // If an error exists, it is redefined as this message so we can read it
    return { facts, error }; // Return an object containing the facts and the error
};

// Function to display the facts
async function displayFacts() {
    const factText = document.getElementById("fact"); // Tag to display the facts in as text content
    const { facts } = await fetchApi(); // Destructure the object returned by fetchApi to get the value of facts
    console.log(facts.text); // Log the fact to the console by getting the text property from the JSON

    factText.innerText = facts.text; // Make the text of the <p> tag the text of the fact
    if (facts.length === 0) factText.innerText = "No facts!"; // If the array of facts is empty, the <p> tag `factText` says there are no facts
};

// Add an event listener to the generate button that executes an async function
document.getElementById("generate").addEventListener("click", async () => {
    const { error } = await fetchApi(); // Destructure the object returned by fetchApi() to get the value of error

    // If there is an error, log the error. If not, call the function to display the facts
    error !== null ? console.log(error) : displayFacts();
});