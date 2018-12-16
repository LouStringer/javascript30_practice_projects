const panelList = document.querySelectorAll('.panel');

function openPanel() {
  panelList.forEach(item => item.classList.remove('open'));
  this.classList.add('open')
}

panelList.forEach(item => {
  item.addEventListener('click', openPanel);
})
