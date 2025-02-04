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
            name: "div",
            className: "d-menu",
            childs: [
                {
                    name: "div",
                    className: "d-content-menu",
                    childs: [
                        { name: "div", className: "d-header-menu" },
                        {
                            name: "div",
                            className: "d-content-items",
                            inject: [{ name: "d-item-menu" }]
                        }
                    ]
                },
                {
                    name: "div",
                    className: "d-close-menu",
                    functions: {
                        onclick: () => dMenu()
                    }
                }
            ]
        }
    }],
    "d-item-menu": [{ element: { name: "div", className: "d-item-menu" } }],
    "d-input": [{
        element: {
            name: "div",
            childs: [{ name: "input", type: "text", value: "", className: "d-input" }]
        }
    }],
    "d-icon": [{
        element: {
            name: "div",
            className: "d-icon",
            childs: [{ name: "div" }]
        }
    }],
    "d-loader": [{ element: { name: "div", className: "d-loader" } }]
};
let contPrincHaveStatic = "";

function dMenu() {
    const tagMenu = document.querySelector(".d-menu");
    if (!window.stateMenu) {
        tagMenu.style.cssText += "display: flex !important; animation: animation-menu-show 0.6s";
        window.stateMenu = true;
    } else {
        tagMenu.style.cssText += "display:none !important;";
        window.stateMenu = false;
    }
}

function appDark() {
    loadGlobalsVar();
    [...document.body.children].forEach(validateTags);
    [...document.all].forEach(element => {
        if (element.getAttribute("isPending")) {
            validateTags(element);
        }
    });
    bind({});
}

function loadGlobalsVar() {
    contPrincHaveStatic = document.querySelector("d-content-topbars") || "";
}

function validateTags(tag) {
    const config = functs[tag.localName];
    if (config) {
        createElement(tag.localName, tag, config);
    } else {
        processElementAttributes(tag, tag);
        [...tag.children].forEach(validateTags);
    }
}

function createElement(tagName, tagElement, config) {
    config.forEach(item => {
        const div = createBaseElement(item.element);
        processElementAttributes(tagElement, div);
        createChildElements(item.element.childs, div, div);
        setChildTextAndAppend(tagElement, item, div);
        assignTagToElement(tagElement, item, div);
        adjustTopBarPixels(tagName, div);
    });
}

function createBaseElement(elementConfig) {
    const div = document.createElement(elementConfig.name);
    Object.assign(div, elementConfig);
    return div;
}

function processElementAttributes(tagElement, div) {
    if (tagElement.attributes.length > 0) {
        let style = "";
        let className = "";
        for (let att of tagElement.attributes) {
            const valueToReplace = att.value.match(/\{\{[a-zA-Z\.]+\}\}/gm);
            if (valueToReplace) {
                const value = att.value.match(/[a-zA-Z\,\+\*\-\=\(\)\"\/0-9\[\]\.]+/gm);
                bindReplace(div, { dataBind: value[0], valueToReplace }, eval(value[0]));
            }
            const resultStyle = getStyleByAttribute(att, tagElement, div);
            style += resultStyle.style;
            className += resultStyle.className;
        }
        div.style = style;
        if (className) div.className = className;
    }
}

function createChildElements(listChild, parentElement, tagElement) {
    if (listChild) {
        listChild.forEach(item => {
            const element = createBaseElement(item);
            parentElement.appendChild(element);
            if (item.inject) {
                item.inject.forEach(({ name }) => injectElement(element, name));
            }
            if (item.childs) createChildElements(item.childs, element, element);
        });
    }
}

function setChildTextAndAppend(tagElement, itemElement, div) {
    if (!itemElement.element.childs && !tagElement.children.length) {
        div.innerText = tagElement.innerText;
        tagElement.innerText = "";
    }
}

function assignTagToElement(tagElement, itemElement, div) {
    if (tagElement.children.length > 0) {
        while (tagElement.firstElementChild) {
            div.appendChild(tagElement.firstElementChild);
        }
        tagElement.appendChild(div);
        [...div.children].forEach(validateTags);
    } else {
        tagElement.appendChild(div);
    }
}

function adjustTopBarPixels(tagName, div) {
    if (contPrincHaveStatic && tagName === "d-principal-content" && contPrincHaveStatic.getAttribute("static")) {
        const sumHeight = [...contPrincHaveStatic.children].reduce((acc, item) => acc + item.clientHeight, 0);
        div.style.top = `${sumHeight}px`;
    }
}

function injectElement(parentElement, tagName) {
    const elementsToInject = document.getElementsByTagName(tagName);
    for (let i = 0; i < elementsToInject.length; i++) {
        const objectTag = elementsToInject[0];
        objectTag.setAttribute("isPending", "true");
        parentElement.appendChild(objectTag);
    }
}

function getStyleByAttribute(att, tagElement, div) {
    let style = "";
    let className = "";
    switch (att.name) {
        case "static":
            style += "position:fixed !important;z-index:1 !important; width:100% !important;";
            break;
        case "orientation":
            style += `display:flex !important;flex-direction:${att.value === "vertical" ? "column" : "row"} !important;`;
            break;
        case "align":
            const [justify, align] = att.value.split(" ");
            style += `display:flex !important;justify-content:${justify} !important; align-items:${align || "stretch"} !important;`;
            break;
        case "size":
            style += parseSizeAttribute(att.value);
            break;
        case "loop":
            styleLoop(tagElement, att.value, div);
            break;
        case "color":
            style += parseColorAttribute(att.value);
            break;
        case "scroll":
            style += "overflow:auto;";
            break;
        case "type":
            className += `${tagElement.localName} ${parseTypeAttribute(att.value)}`;
            break;
        case "visible":
            style += `display:${eval(att.value) ? "inline-block" : "none"};`;
            break;
        case "style":
            style += att.value;
            break;
        default:
            if (!att.value && !attributes.includes(att.name)) {
                bindDynamicAttributes(div, att, tagElement);
            }
            break;
    }
    return { style, className };
}

function parseSizeAttribute(value) {
    if (value.includes("{")) {
        const json = JSON.parse(value.replace(/([a-zA-Z0-9_#\-\(\)\%\s]+)/gm, (_, m) => `"${m}"`));
        const { x, y, padding = "0px 0px 0px 0px", margin = "0px 0px 0px 0px" } = json;
        const [pt, pb, pl, pr] = padding.split(" ");
        const [mt, mb, ml, mr] = margin.split(" ");
        return `width:${x} !important;height:${y} !important;padding:${pt} ${pr} ${pb} ${pl} !important;margin:${mt} ${mr} ${mb} ${ml} !important;`;
    }

    const [width, height] = value.split(",");
    return `width:${width.includes("%") ? width : `${width}px`} !important;height:${height.includes("%") ? height : `${height}px`} !important;`;
}

function parseColorAttribute(value) {
    if (value.includes("{")) {
        const { backgroundColor, text, shadow, header } = JSON.parse(value.replace(/([a-zA-Z0-9_#\-\(\)\%\s]+)/gm, (_, m) => `"${m}"`));
        if (header) {
            document.querySelector(".d-header-menu").style.backgroundColor = header;
        }
        return `background-color:${backgroundColor} !important;color:${text} !important;box-shadow:${shadow} !important;`;
    }
    return `background-color:${value} !important;`;
}

function parseTypeAttribute(value) {
    switch (value) {
        case "search":
            return "d-icon-search";
        case "subMenu":
            return "d-icon-sub-menu";
        default:
            return "";
    }
}

function bindDynamicAttributes(div, att, tagElement) {
    const varTag = att.name;
    try {
        const tgValue = eval(varTag);
        if (Array.isArray(tgValue)) {
            tgValue.forEach(attri => {
                const [name, value] = attri.split("=");
                createAttribute(name.trim(), value.trim(), div);
                const resultStyle = getStyleByAttribute({ name: name.trim(), value: value.trim() }, tagElement, div);
                div.style += resultStyle.style;
                div.className += resultStyle.className;
            });
        } else {
            switch (typeof tgValue) {
                case "string":
                    const nameTagToInject = varTag.split(".").pop();
                    createAttribute(nameTagToInject, tgValue, div);
                    const resultStyle = getStyleByAttribute({ name: nameTagToInject, value: tgValue }, tagElement, div);
                    div.style += resultStyle.style;
                    div.className += resultStyle.className;
                    break;
                case "object":
                    for (let key of Object.keys(tgValue)) {
                        createAttribute(key, tgValue[key], div);
                        const resultStyle = getStyleByAttribute({ name: key, value: tgValue[key] }, tagElement, div);
                        div.style += resultStyle.style;
                        div.className += resultStyle.className;
                    }
                    break;
            }
        }
    } catch (error) {
        console.info(error);
    }
}

function createAttribute(name, value, element) {
    const attr = document.createAttribute(name);
    attr.value = value;
    element.setAttributeNode(attr);
}

function styleLoop(tagElement, value, div) {
    const parent = tagElement.parentElement;
    if (value > 0) {
        for (let i = 1; i < value; i++) {
            createLoopElements(tagElement, value, parent);
        }
    } else {
        const objectToBind = { expresion: value, dataBind: value.split(" ")[0], valueToReplace: tagElement.outerHTML.match(/\{\{[a-zA-Z\.]+\}\}/gm) };
        let first = true;
        let valueFirst = "";

        for (const _ of eval(value)) {
            if (first) {
                valueFirst = eval(objectToBind.dataBind);
                first = false;
            } else {
                createLoopElements(tagElement, objectToBind, parent, eval(objectToBind.dataBind));
            }
        }
        bindReplace(tagElement, objectToBind, valueFirst);
        tagElement.innerHTML = tagElement.innerHTML.replace(new RegExp(`\\{.${objectToBind.dataBind}\\}.`, 'g'), valueFirst);
    }
}

function bindReplace(divLoop, value, text) {
    if (value.valueToReplace) {
        value.valueToReplace.forEach(objValue => {
            const varToBind = objValue.match(/[a-zA-Z\,\+\*\-\=\(\)\"\/0-9\[\]\.]+/gm);
            const getSubValue = varToBind[0].match(/[\.]/gm);
            if (getSubValue) {
                const realObject = varToBind[0].replace(value.dataBind, "text");
                let getValueRealObject = eval(realObject);
                const resultMatch = getValueRealObject?.match(/\{\{[a-zA-Z\.]+\}\}/gm);
                if (resultMatch) {
                    const objectToReplace = { ...value, valueToReplace: resultMatch };
                    getValueRealObject = bindReplace(getValueRealObject, objectToReplace, text);
                }
                if (typeof divLoop === "object") {
                    divLoop.innerHTML = divLoop.innerHTML.replace(objValue, getValueRealObject);
                    [...divLoop.attributes].forEach(attDiv => {
                        attDiv.nodeValue = attDiv.nodeValue.replace(objValue, getValueRealObject);
                    });
                } else {
                    divLoop = divLoop.replace(objValue, getValueRealObject);
                }
            } else {
                if (typeof divLoop === "object") {
                    divLoop.innerHTML = divLoop.innerHTML.replace(new RegExp(`\\{.${value.dataBind}\\}.`, 'g'), text);
                } else {
                    divLoop = divLoop.replace(new RegExp(`\\{.${value.dataBind}\\}.`, 'g'), text);
                }
            }
        });
    }
    return typeof divLoop === "object" ? null : divLoop;
}

function createLoopElements(tagElement, value, parent, text) {
    const divLoop = document.createElement(tagElement.localName);
    [...tagElement.attributes].forEach(attr => {
        if (attr.name !== "loop") {
            createAttribute(attr.name, attr.value, divLoop);
        }
    });
    divLoop.innerHTML = tagElement.innerHTML;
    bindReplace(divLoop, value, text);
    parent.appendChild(divLoop);
}

function bind(data) {
    const initBind = item => {
        const getAtt = item.getAttribute("bind");
        let txtElement = getAtt || item.textContent || item.value || item.outerHTML;
        if (txtElement && /[\{\}]+/gm.test(txtElement)) {
            item.setAttribute("bind", txtElement);
            txtElement.match(/\{+[a-zA-Z\,\+\*\-\=\(\)\"\/0-9]+\}+/gm)?.forEach(varBind => {
                const concatVar = varBind.match(/[a-zA-Z\+\-\*\=\(\)\"\/0-9]+/gm)?.reduce((acc, nameVar) => acc + eval(nameVar), "");
                if (/[\{\}]+/gm.test(item.innerHTML)) {
                    item.innerHTML = item.innerHTML.replace(varBind, concatVar);
                } else if (/[\{\}]+/gm.test(item.outerHTML)) {
                    item.outerHTML = item.outerHTML.replace(varBind, concatVar);
                }
            });
        }
    };

    const loopElements = element => {
        if (element.children.length > 0) {
            initBind(element);
            [...element.children].forEach(loopElements);
        } else {
            initBind(element);
        }
    };

    [...document.body.children].forEach(loopElements);
}
