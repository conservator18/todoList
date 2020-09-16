document.addEventListener("scroll", function (e) {
  var foot = parent.document.querySelector("[name=foot]");
  var footer = foot.contentDocument.querySelector("body .footer");
  if (document.querySelector("html").scrollLeft > window.screen.width / 2) {
    // 切换底部选中标签
    footer.children[0].children[0].classList.add("show");
    footer.children[0].children[1].classList.remove("show");
    footer.children[1].children[0].classList.remove("show");
    footer.children[1].children[1].classList.add("show");
  } else {
    // 切换底部选中标签
    footer.children[0].children[0].classList.remove("show");
    footer.children[0].children[1].classList.add("show");
    footer.children[1].children[0].classList.add("show");
    footer.children[1].children[1].classList.remove("show");
  }
});
