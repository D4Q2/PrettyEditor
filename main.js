// Syntax highlight for JS
      const js = el => {
        for (const node of el.children) {
          const s = node.innerText
            //.replace(/(\/\/.*)/g, '<em>$1</em>')
            .replace(
              /\b(if|else)(?=[^\w])/g,
              '<ifelse>$1</ifelse>',
            )
            .replace(
              /\b(\.length)(?=[^\w])/g,
              '<strong>$1</strong>',
            )
            //.replace(/(".*?"|'.*?'|`.*?`)/g, '<strong><em>$1</em></strong>')
            //.replace(/\b(\d+)/g, '<em><strong>$1</strong></em>');
          node.innerHTML = s.split('\n').join('<br/>');
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
          if (e.keyCode != 0x28 && e.keyCode != 0x25 && e.keyCode != 0x26 && e.keyCode != 0x27) {
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
   var code = document.querySelector('.editor').innerHTML;
   var trimmed = code.replaceAll("<div>", "");
   var trimmed = trimmed.replaceAll("</div>", "");
   var trimmed = trimmed.replaceAll("<em>", "");
   var trimmed = trimmed.replaceAll("</em>", "");
   var trimmed = trimmed.replaceAll("<strong>", "");
   var trimmed = trimmed.replaceAll("</strong>", "");
   var trimmed = trimmed.replaceAll("<ifelse>", "");
   var trimmed = trimmed.replaceAll("</ifelse>", "");
   var trimmed = trimmed.replaceAll("<br>", "");
  
   var output = document.getElementById("code").contentWindow.document;
   output.open();
   output.writeln( trimmed );
   output.close();
}

function setupTemplate() {
  var request = new XMLHttpRequest();
  request.open('GET', 'template.txt', false);
  request.send();
  var textFileContent = request.responseText; 
  
  var code = document.querySelector('.editor');
  code.innerHTML = textFileContent;
}
