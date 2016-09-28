function save_options() {
  let allFields = document.getElementsByClassName('textfield')
  let fieldVals = []
  let linkName;
  let save = {};
  for(let i = 0; i < allFields.length; i ++) {
    fieldVals.push(allFields[i].value)
    linkName = `link${i}`;
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

let counter = 0;
function render_form() {
  let newdiv = document.createElement('div');
  newdiv.innerHTML="Entry "+(counter + 1)+" <br><input type='text' class='textfield' />";
  document.getElementById('fields').appendChild(newdiv);
  counter++;
}

function restore_options() {
  chrome.storage.sync.get(function(items) {
    let j = 0
    Object.keys(items).forEach( (key) => {
      let newdiv2 = document.createElement('div');
      newdiv2.innerHTML="Entry "+(j + 1)+` <br><input type='text' class='textfield' value=${items[key]}>`;
      document.getElementById('fields').appendChild(newdiv2);
      j++;
    });
  });
}
document.addEventListener('DOMContentLoaded', restore_options);

document.getElementById('createNew').addEventListener('click', render_form);
document.getElementById('save').addEventListener('click',
    save_options);