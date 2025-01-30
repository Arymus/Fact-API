const factText = document.getElementById("fact");
const generate = document.getElementById("generate");

async function fetchApi() {
    const url = "https://uselessfacts.jsph.pl/api/v2/facts/random"; // Defines the URL of the API
    let error = null; // Error shouldn't exist, therefore it is null
    let facts = []; // The fact will be put in an array for handling, but right now it is empty

    try {
        const response = await fetch(url); // Fetch the fact from the URL and store it in `response`
        if (!response.ok) {
            throw new Error("HTTP error! Status: " + response.status.toString()); // Collect the HTTP status as a string if the HTTP response isn't 200
        };
    facts = await response.json(); // Parse the facts into JSON format to so we can use properties on it
    } catch(e) {
        error = "Failed to fetch fact: " + e.message; // If an error exists, it is redefined as this message so we can read it
    }
    return { facts, error }; // Return the final values of `facts` and `error`
};


async function displayFacts() {
    const { facts } = await fetchApi(); // Assign the value of `facts` as it's value at the end of the `fetchAPI()` function 

    console.log(facts.text); // Log the fact to the console

    factText.innerText = facts.text; // Make the text of the <p> tag `factText` the fact
    if (facts.length === 0) {
        factText.innerText = "No facts!"; // If the array of facts is empty, the <p> tag `factText` says there are no facts
    }
};

generate.addEventListener("click", async () => {
    const { facts, error } = await fetchApi(); // Assign the value of facts and error
    // If there is an error, log the error. If not, call the function to display the facts
    if (error) {
        console.error(error);
    } else {
        displayFacts(facts);
    }
});
