const factText = document.getElementById("fact");
const generate = document.getElementById("generate");

async function fetchApi() {
    const url = "https://api.aakhilv.me/";
    let error = null;
    let facts = [];

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("HTTP error! Status: " + response.status.toString());
        };
    facts = await response.json();
    } catch(e) {
        error = "Failed to fetch fact: " + e.message;
    }
    return {facts, error};
};


function displayFacts(facts) {
    const fact = facts[Math.floor(Math.random() * facts.length)];
    factText.innerText = fact;
    if (facts.length === 0) {
        factText.innerText = "No facts!";
    }
};

generate.addEventListener("click", async () => {
    const { facts, error } = await fetchApi();
    if (error) {
        console.error(error);
    } else {
        displayFacts(facts);
    }
});