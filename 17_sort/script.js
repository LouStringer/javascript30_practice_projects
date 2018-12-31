const unsorted = Array.from(document.querySelectorAll('p'));
const unsortedArray = unsorted.map(item => {
  return item.innerHTML;
})

const deArticle = item => {
  return item.replace(/^(the |a |an )/i, '').trim();
}

const sortedArray = unsortedArray.sort((a,b) => deArticle(a) > deArticle(b) ? 1 : -1);

document.querySelector('body').innerHTML = sortedArray.map(item => `<p>${item}</p>`).join('');
