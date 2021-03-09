window.addEventListener("load", appDark, false);
var functs = {
};

function appDark() {
    for (let item of document.body.children) {
        validateTags(item);
    }
    for (const element of document.all) {
        validateTags(element);
    };
}

function validateTags(tag) {
    if (functs[tag.localName] != null) {
        createElement(tag.localName, tag, functs[tag.localName]);
    } 
}

function createElement(tagName, tagElement, config) {
    config.forEach(itemElement => {
        let div = document.createElement(itemElement.element.name);
        div.className = itemElement.element.className;
        div.value = itemElement.element.value;
        div.style = itemElement.element.style;
        if (itemElement.element.functions) {
            Object.assign(div, { ...itemElement.element.functions });
        }
        let inner = tagElement.innerHTML;
        tagElement.innerHTML ="";
        tagElement.innerText = "";
        div.innerHTML = inner;
        tagElement.appendChild(div);
    });
}
