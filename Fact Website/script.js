const factText = document.getElementById("fact");
const generate = document.getElementById("generate");

async function fetchApi() {
    const url = "https://uselessfacts.jsph.pl/api/v2/facts/random";
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
    return { facts, error };
};


async function displayFacts() {
    const { facts } = await fetchApi();

    console.log(facts.text);

    factText.innerText = facts.text;
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
