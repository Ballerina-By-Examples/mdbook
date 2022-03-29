// chapter folding
const chapters = document.querySelectorAll(".chapter-item > div");

chapters.forEach((chapter) => {
  chapter.addEventListener("click", () => {
    let className = chapter.parentElement.className;
    if (className === "chapter-item ") {
      chapter.parentElement.className = "chapter-item expanded";
    } else {
      chapter.parentElement.className = "chapter-item ";
    }
  });
});
