const code_blocks = document.getElementsByClassName("language-go");

for (let i = 0; i < code_blocks.length; i++) {
  const code = code_blocks[i].innerText;
  console.log(code);

  shiki
    .getHighlighter({
      theme: "light-plus",
      langs: ["ballerina"],
    })
    .then((highlighter) => {
      const output = highlighter.codeToHtml(`${code}`, {
        lang: "ballerina",
      });

      // remove child nodes
      while (code_blocks[i].firstChild) {
        code_blocks[i].removeChild(code_blocks[i].firstChild);
      }

      document.getElementsByClassName("language-go")[i].innerHTML = output;
    });
}
