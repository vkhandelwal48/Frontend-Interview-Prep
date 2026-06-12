const mutationObserver = new MutationObserver(entries => {
    console.log(entries);
})

const parent = document.querySelector('.parent');
mutationObserver.observe(parent, {
    childList: true, // anytime we make changes to the children of this element we want to log that change
});
mutationObserver.disconnect(); // we can also disconnect the observer if we don't want to log changes anymore

mutationObserver.observe(parent.children[0], {childList: true}); // we can also observe specific elements, in this case the first child of the parent element

parent.children[0].remove(); // this will trigger the mutation observer and log the change to the console
parent.appendChild(document.createElement('div')); // this will also trigger the mutation observer and log the change to the console

setTimeout(() => parent.appendChild(document.createElement('div')), 100);

// addedNodes: tells you which nodes were added to the DOM
// removedNodes: tells you which nodes were removed from the DOM
// previousSibling: tells you the previous sibling of the added or removed node
// nextSibling: tells you the next sibling of the added or removed node
// target: tells you the element that was changed
