// import tailwind.css as file;
let haystack = `
  .hello {
  display: flex
  }
.hello {
  display: flex
  }
`;

let newCss = "";

// classNames will be deep search in all rustfiles, and remove
const classNames = [".hello"];

classNames.forEach(className => {
  const findThis = new RegExp(className, "ig")
  const needles = haystack.match(findThis);
  if (needles.length > 0) {
    needles.forEach(needle => {
      const start = haystack.indexOf(needle);
      let endBracePos = 0;
      let endBraceFound = false;
      while (endBraceFound === false) {
        if (!endBracePos) endBracePos = start + className.length; // ran once
        if (haystack[endBracePos] !== "}") {
          endBracePos += 1;
        }
        if (haystack[endBracePos] === "}" || !haystack[endBracePos]) {
          endBraceFound = true;
        }
      }
      newCss += haystack.substring(start, endBracePos + 1);
      console.log(newCss);
    });
  }
});
