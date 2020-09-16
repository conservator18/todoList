// 判断页面是否被刷新
if (window.performance.navigation.type == 1) {
  console.log("页面被刷新");
} else {
  console.log("首次被加载");
}
// 点击分类
document.querySelector(".sort").addEventListener("click", function (e) {
  var evt = e || window.event;
  var target = evt.target;
  var todoList = window.content.todo.todoList;
  if (target && target.classList.contains("finish")) {
    // 已完成
    window.frames["head"].document.querySelector(".center p").innerText =
      "已完成";
    var finishList = [];
    for (var i = 0; i < todoList.length; i++) {
      if (todoList[i].status == "1") {
        finishList.push(todoList[i]);
      }
    }
    localStorage.setItem("finishList", JSON.stringify(finishList));
    window.content.todo.showList(
      JSON.parse(localStorage.getItem("finishList"))
    );
  } else if (target && target.classList.contains("unfinish")) {
    // 未完成
    window.frames["head"].document.querySelector(".center p").innerText =
      "未完成";
    var unfinishList = [];
    for (var i = 0; i < todoList.length; i++) {
      if (todoList[i].status == "0") {
        unfinishList.push(todoList[i]);
      }
    }
    localStorage.setItem("unfinishList", JSON.stringify(unfinishList));
    window.content.todo.showList(
      JSON.parse(localStorage.getItem("unfinishList"))
    );
  } else if (target && target.classList.contains("all")) {
    // 全部
    window.content.todo.showList(JSON.parse(localStorage.getItem("todoList")));
    window.frames["head"].document.querySelector(".center p").innerText =
      "事项";
  }
});
