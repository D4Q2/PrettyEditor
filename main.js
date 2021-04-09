// Syntax highlight for JS
      const js = el => {
        for (const node of el.children) {
          // it can update later
          if (node.innerText.includes('<')) {
                
          }
          else {
            var s = node.innerText
            // remember to remove all of these tags below when writing to the iframe
            //.replace(/(\/\/.*)/g, '<comment>$1</comment>') 
            .replace(
               /\b(new|if|else|do|while|switch|for|in|continue|break|return|typeof|function|var|const|let|\.length)(?=[^\w])/g,
              '<basewords>$1</basewords>',
            )
            .replace(/\b(\d+)/g, '<number>$1</number>')
            .replace(/\b(float|int|string|bool)/g, '<datatype>$1</datatype>')
            .replace(/(".*?"|'.*?'|`.*?`)/g, '<inquotes>$1</inquotes>');
            //.replace(/\b(a|b|c|d|f|e|g|h|i|j|k|l|m|n|o|p|q|s|t|u|v|w|x|y|z)/g, '<text>$1</text>')
           
            s = s.replaceAll('<!--','<comment><!--');
            s = s.replaceAll('-->','--></comment>');
                
          node.innerHTML = s.replaceAll('\n','<br/>');
          //node.innerHTML = s.split('\n').join('<br/>'); 
          }
        }
      };


      const editor = (el, highlight = js, tab = '    ') => {
        const caret = () => {
          const range = window.getSelection().getRangeAt(0);
          const prefix = range.cloneRange();
          prefix.selectNodeContents(el);
          prefix.setEnd(range.endContainer, range.endOffset);
          return prefix.toString().length;
        };

        const setCaret = (pos, parent = el) => {
          for (const node of parent.childNodes) {
            if (node.nodeType == Node.TEXT_NODE) {
              if (node.length >= pos) {
                const range = document.createRange();
                const sel = window.getSelection();
                range.setStart(node, pos);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
                return -1;
              } else {
                pos = pos - node.length;
              }
            } else {
              pos = setCaret(pos, node);
              if (pos < 0) {
                return pos;
              }
            }
          }
          return pos;
        };

        highlight(el);

        el.addEventListener('keydown', e => {
          if (e.keyCode == 0x3C) {
                console.log("< pressed");
                return false;
          }
          if (e.which === 9) {
            const pos = caret() + tab.length;
            const range = window.getSelection().getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(tab));
            highlight(el);
            setCaret(pos);
            e.preventDefault();
          }
        });

        el.addEventListener('keyup', e => {
          if (e.keyCode != 0x28 && e.keyCode != 0x25 && e.keyCode != 0x26 && e.keyCode != 0x27 && e.keyCode != 0x0D && e.keyCode != 0x2E) {
            const pos = caret();
            highlight(el);
            setCaret(pos);
          }
        });
      };

      // Turn div into an editor
      const el = document.querySelector('.editor');
      el.focus();
      editor(el);

function compile() {
   var code = document.getElementsByClassName("editor");
   var trimmed = code[0].innerText.replaceAll("<div>", "");
   var trimmed = trimmed.replaceAll("</div>", "");
   var trimmed = trimmed.replaceAll("<em>", "");
   var trimmed = trimmed.replaceAll("</em>", "");
   var trimmed = trimmed.replaceAll("<strong>", "");
   var trimmed = trimmed.replaceAll("</strong>", "");
   var trimmed = trimmed.replaceAll("<basewords>", "");
   var trimmed = trimmed.replaceAll("</basewords>", "");
   var trimmed = trimmed.replaceAll("<number>", "");
   var trimmed = trimmed.replaceAll("</number>", "");
   var trimmed = trimmed.replaceAll("<datatype>", "");
   var trimmed = trimmed.replaceAll("</datatype>", ""); 
   var trimmed = trimmed.replaceAll("<inquotes>", "");
   var trimmed = trimmed.replaceAll("</inquotes>", "");  
   var trimmed = trimmed.replaceAll("<br>", "");
   var trimmed = trimmed.replaceAll("&nbsp;", "");
   var trimmed = trimmed.replaceAll("&lt;", "<");
   var trimmed = trimmed.replaceAll("&gt;", ">");
  
   var output = document.getElementById("code").contentWindow.document;
   output.open();
   output.write( trimmed );
   output.close();
}

function setupTemplate() {
  //var request = new XMLHttpRequest();
  //request.open('GET', 'template.txt', false);
  //request.send();
  //var textFileContent = request.responseText; 
  
  var code = document.querySelector('.editor');
  document.getElementById('log').innerHTML = "<html><head><title>New</title></head><body>Your stuff here.</body></html>"; 
  code.value = "<html><head><title>New</title></head><body>Your stuff here.</body></html>";
}
