const panelList = document.querySelectorAll('.panel');

function openPanel() {
  if (!this.classList.contains('open')) {
    panelList.forEach(item => item.classList.remove('open'));
  }
  this.classList.toggle('open')
}

panelList.forEach(item => {
  item.addEventListener('click', openPanel);
})
