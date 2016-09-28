function save_options() {
  let allFields = document.getElementsByClassName('textfield')
  let fieldVals = []
  let linkName;
  let save = {};
  for(let i = 0; i < allFields.length; i ++) {
    fieldVals.push(allFields[i].value)
    linkName = allFields[i].value;
    save[linkName] = allFields[i].value
    chrome.storage.sync.set(save, function() {
      let status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
}
window.getStore = function () {
  chrome.storage.sync.get(null, function (data) { console.info(data) });
}
let counter = 0;
function render_form() {
  let newdiv = document.createElement('div');
  newdiv.innerHTML=" <br><input type='text' class='textfield' /><button type='button' class='remove-btn'>-</button>";
  document.getElementById('fields').appendChild(newdiv);
  counter++;
  let deleteButtons = document.getElementsByClassName('remove-btn')
  loopThroughButtons(deleteButtons);
}

function loopThroughButtons(classes) {
  for (var i = 0; i < classes.length; i++) {
    classes[i].addEventListener('click', removeButton, false);
  }
}

function removeButton() {
  console.log(this.parentElement.children[1].value)
  chrome.storage.sync.remove(this.parentElement.children[1].value)
  superParent = this.parentElement.parentElement
  superParent.removeChild(this.parentElement)
}

function restore_options() {
  chrome.storage.sync.get(function(items) {
    let j = 0
    Object.keys(items).forEach( (key) => {
      let newdiv2 = document.createElement('div');
      newdiv2.innerHTML=` <br><input type='text' class='textfield' value=${items[key]}><button type='button' class='remove-btn'>-</button>`;
      document.getElementById('fields').appendChild(newdiv2);
      j++;
    });
    let deleteButtons2 = document.getElementsByClassName('remove-btn')
     loopThroughButtons(deleteButtons2);
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('createNew').addEventListener('click', render_form);
document.getElementById('save').addEventListener('click', save_options);