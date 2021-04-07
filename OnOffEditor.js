let editorHtml = '<div class="editor" contenteditable="true" spellcheck="false"></div><button onclick="compile()" class="runButton">Run</button><button onclick="setupTemplate()" class="tempButton">Template</button><div class="background"><iframe id="code"></iframe></div><script src="main.js"></script>'
 

function activateEditor(name) {
  var codeAreaHtml = document.getElementById(name).innerHTML;
  console.log(name);
  if (codeAreaHtml == '') {
      // The editor is not there, create it
      document.getElementById(name).innerHTML == editorHtml;
  } 
  else if (codeAreaHtml.includes('<button onclick="compile()" class="runButton">Run</button>')) {
      // The editor is there, remove it
      document.getElementById(name).innerHTML == '';
  }
  else {
    console.log('There is a problem with code editor area. It has an unexpected inner html.');
  }
}
