let editorHtml = '<div class="editor" contenteditable="true" spellcheck="false"></div><button onclick="compile()" class="runButton">Run</button><button onclick="setupTemplate()" class="tempButton">Template</button><div class="background"><iframe id="code"></iframe></div><script src="main.js"></script>'
 

function activateEditor(name) {
  var codeAreaHtml = document.getElementById(name).innerHTML;
  if (codeAreaHtml.includes('<button onclick="compile()" class="runButton">Run</button>')) {
    console.log("The editor is active, destroying it...");
    // The editor is there, remove it
    const myNode = document.getElementById(name);
    myNode.innerHTML = '';
    //document.getElementById(name).innerHtml == '';
  }
  else {
    console.log('No editor, creating one...');
    // The editor is not there, create it
    document.getElementById(name).innerHTML == editorHtml;
  }
 /*
  console.log(name);
  if (codeAreaHtml == '') {
    console.log('No editor, creating one...');
    // The editor is not there, create it
    document.getElementById(name).innerHTML == editorHtml;
  } 
  else if (codeAreaHtml.includes('<button onclick="compile()" class="runButton">Run</button>')) {
    console.log("The editor is active, destroying it...");
    // The editor is there, remove it
    const myNode = document.getElementById(name);
    myNode.innerHTML = '';
    //document.getElementById(name).innerHtml == '';
  }
  else {
    console.log('There is a problem with code editor area. It has an unexpected inner html.');
  }
  */
}
