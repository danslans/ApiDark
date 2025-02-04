window.addEventListener("load", appDark, false);
window.stateMenu = false;

const attributes = ["static", "orientation", "align", "size", "loop", "color", "scroll", "type"];
const functs = {
    "d-content-topbars": [{ element: { name: "div" } }],
    "d-topbar": [{ element: { name: "div", className: "d-topbar" } }],
    "d-principal-content": [{ element: { name: "div", className: "d-principal-content" } }],
    "d-content": [{ element: { name: "div", className: "d-content" } }],
    "d-content-section": [{ element: { name: "div", className: "d-content-section" } }],
    "d-menu": [{
        element: {
            name: "div", className: "d-menu",
            childs: [
                { name: "div", className: "d-content-menu", childs: [
                    { name: "div", className: "d-header-menu" },
                    { name: "div", className: "d-content-items", inject: [{ name: "d-item-menu" }] }
                ] },
                { name: "div", className: "d-close-menu", functions: { onclick: () => dMenu() } }
            ]
        }
    }],
    "d-item-menu": [{ element: { name: "div", className: "d-item-menu" } }],
    "d-input": [{ element: { name: "div", childs: [{ name: "input", type: "text", value: "", className: "d-input" }] } }],
    "d-icon": [{ element: { name: "div", className: "d-icon", childs: [{ name: "div" }] } }],
    "d-loader": [{ element: { name: "div", className: "d-loader" } }]
};

let contPrincHaveStatic = "";

function dMenu() {
    const tagMenu = document.querySelector(".d-menu");
    window.stateMenu = !window.stateMenu;
    tagMenu.style.display = window.stateMenu ? "flex" : "none";
    tagMenu.style.animation = window.stateMenu ? "animation-menu-show 0.6s" : "";
}

function appDark() {
    loadGlobalsVar();
    document.body.children.forEach(validateTags);
    document.querySelectorAll("[isPending]").forEach(validateTags);
    bind({});
}

function loadGlobalsVar() {
    contPrincHaveStatic = document.querySelector("d-content-topbars") || "";
}

function validateTags(tag) {
    if (functs[tag.localName]) {
        createElement(tag.localName, tag, functs[tag.localName]);
    } else {
        processAttributes(tag);
        tag.children.forEach(validateTags);
    }
}

function createElement(tagName, tagElement, config) {
    config.forEach(({ element }) => {
        let div = document.createElement(element.name);
        Object.assign(div, {
            className: element.className,
            value: element.value,
            style: element.style,
            ...element.functions
        });
        processAttributes(tagElement, div);
        createChildElements(element.childs, div);
        validateChildContent(tagElement, div);
        attachElement(tagElement, div);
        adjustTopBar(tagName, div);
    });
}

function processAttributes(source, target = source) {
    [...source.attributes].forEach(att => {
        if (attributes.includes(att.name)) {
            Object.assign(target.style, getStyleByAttribute(att.name, att.value));
        } else {
            target.setAttribute(att.name, att.value);
        }
    });
}

function createChildElements(children, parent) {
    if (!children) return;
    children.forEach(child => {
        let elem = document.createElement(child.name);
        Object.assign(elem, {
            className: child.className,
            type: child.type,
            textContent: child.value,
            value: child.value,
            ...child.functions
        });
        if (child.inject) {
            child.inject.forEach(({ name }) => injectElement(elem, name));
        }
        parent.appendChild(elem);
        if (child.childs) createChildElements(child.childs, elem);
    });
}

function validateChildContent(source, target) {
    if (!source.children.length && !target.children.length) {
        target.innerText = source.innerText;
        source.innerText = "";
    }
}

function attachElement(tagElement, newElement) {
    while (tagElement.firstElementChild) {
        newElement.appendChild(tagElement.firstElementChild);
    }
    tagElement.appendChild(newElement);
    tagElement.children.forEach(validateTags);
}

function adjustTopBar(tagName, element) {
    if (!contPrincHaveStatic) return;
    if (tagName === "d-principal-content" && contPrincHaveStatic.hasAttribute("static")) {
        element.style.top = `${[...contPrincHaveStatic.children].reduce((sum, el) => sum + el.clientHeight, 0)}px`;
    }
}

function injectElement(parent, tagName) {
    document.querySelectorAll(tagName).forEach(tag => {
        tag.setAttribute("isPending", "true");
        parent.appendChild(tag);
    });
}

function getStyleByAttribute(name, value) {
    switch (name) {
        case "static": return { position: "fixed", zIndex: "1", width: "100%" };
        case "orientation": return { display: "flex", flexDirection: value || "row", flexWrap: "wrap" };
        case "align": return { display: "flex", justifyContent: value.split(" ")[0], alignItems: value.split(" ")[1] || "" };
        case "size": return parseSize(value);
        case "color": return { backgroundColor: value };
        case "scroll": return { overflow: "auto" };
        case "type": return { className: `d-icon-${value}` };
        case "visible": return { display: value === "true" ? "inline-block" : "none" };
        default: return {};
    }
}

function parseSize(value) {
    let [width, height] = value.split(",").map(v => (v.includes("%") ? v : `${v}px`));
    return { width, height };
}

function bind() {
    document.body.querySelectorAll("[bind]").forEach(item => {
        let boundText = item.getAttribute("bind").replace(/\{\{(.*?)\}\}/g, (_, expr) => eval(expr));
        item.innerHTML = boundText;
    });
}
