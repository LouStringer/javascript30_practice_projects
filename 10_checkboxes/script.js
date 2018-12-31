const listItems = [...document.querySelectorAll('.item')];
let lastClickedIndex = 0;

const clicked = event => {
  if (!event.shiftKey && event.currentTarget.firstElementChild.checked) {
    lastClickedIndex = listItems.indexOf(event.currentTarget)
  } else if (event.currentTarget.firstElementChild.checked) {
    let thisClickedIndex = listItems.indexOf(event.currentTarget);
    let lower, higher;
    if (thisClickedIndex > lastClickedIndex) {
      higher = thisClickedIndex;
      lower = lastClickedIndex;
    } else {
      lower = thisClickedIndex;
      higher = lastClickedIndex;
    }
    listItems.forEach(item => {
      if (listItems.indexOf(item) > lower && listItems.indexOf(item) < higher) {
        item.firstElementChild.checked = true;
      }
    });
  }
};
listItems.forEach(item => item.addEventListener('click', clicked))
