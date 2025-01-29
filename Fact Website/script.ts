const factText: HTMLElement | null = document.getElementById("fact"); // Define the <p> tag in index.html as an HTML element
const generate: HTMLElement | null = document.getElementById("generate"); // Define the <button> tag in index.html as an HTML element

async function fetchApi() {
    const url: string = "https://uselessfacts.jsph.pl/random.json"; // Defines the API URL as a string
    let error: null | string = null; // Error shouldn't exist, so we define it as null OR as a string (so that we can redefine the error into a printable message if it arises)
    let facts: string[] = []; // An array of strings that contains all the facts, empty until the fetch inputs the facts

    try {
        const response = await fetch(url); // Fetch the facts from the url and store it in a variable
        console.log("Response: " + response); // Logs the API response into the console 
        if (!response.ok) {
            throw new Error("HTTP error! Status: " + response.status.toString()); // Throw an HTTP error when the HTTP response doesn't return as 200
        };
        facts = await response.json(); // Parse the facts into JSON format
        console.log(facts); // Log the facts in JSON form
    } catch(e) {
        error = "Failed to fetch fact: " + e.message; // Redefine error as an error message if an error occurs
    }
    return {facts, error}; // Return facts and error
};


function displayFacts(facts) {
    const fact: string = facts[Math.floor(Math.random() * facts.length)]; // Randomly pick a fact from the fact array
    factText!.innerText = fact; // Defines the text inside the <p> element in index.html as fact, the ! means that the data type of factText is guaranteed NOT to be null
    if (facts.length === 0) {
        factText!.innerText = "No facts!"; // If there are no facts in the array, display "No facts!"
    }
};

generate!.addEventListener("click", async () => {
    const { facts, error } = await fetchApi(); // I don't understand this part
    // If there is an error, log it in the console. If not, display the facts
    if (error) {
        console.error(error);
    } else {
        displayFacts(facts);
    }
});
