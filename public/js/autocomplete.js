
const tagsArr = document.querySelector(".tagsArr")

function autocomplete(inp, fetchTags) {
    let newArr = []

    inp.addEventListener("input", async function (e) {
        let autocompleteList, val = this.value;

        closeAutoComplete();
        if (!val) { return false; }

        autocompleteList = document.createElement("div");
        autocompleteList.setAttribute("id", this.id + "autocomplete-list");
        autocompleteList.setAttribute("class", "autocomplete-items");


        const tags = await fetchTags(val);
        console.log('tags--->>>>>', tags);

        for (let i = 0; i < tags.length; i++) {
            const tag = document.createElement('div')

            tag.innerText = tags[i];
            tag.addEventListener("click", function (e) {
                newArr.push(tags[i])
                console.log(newArr);
                let newArrText = newArr.join(',')
                console.log(newArrText);
                tagsArr.value = newArrText;
                inp.value = ""

                closeAutoComplete();
            });

            autocompleteList.appendChild(tag);

        }

        this.parentNode.appendChild(autocompleteList);

    });

    function closeAutoComplete() {

        let autocompleteList = document.querySelector(".autocomplete-items");
        if (autocompleteList !== null) {

            autocompleteList.parentNode.removeChild(autocompleteList);
        }
    }

    document.addEventListener("click", function (e) {
        closeAutoComplete()
    });
}

let tags = ["concert", "event", "exhibision", "show", "live", "performance", "ballet", "opera", "meet-up", "fair", "comedy", "stand-up"];

async function fetchTags(queryString) {
    const response = await fetch(`/api/getTags/?text=${queryString}`, { headers: { 'Content-Type': 'application/json' } })

    return response.json();

}


autocomplete(document.querySelector('[name="tag2"]'), fetchTags);

// let tags = ["concert", "event", "exhibision", "show", "live", "performance", "ballet", "opera", "meet-up", "fair", "comedy", "stand-up"];