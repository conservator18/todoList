/**
 * 清单列表
 * content 清单内容
 * status 0 未完成  1 已完成
 */
var todoList = [];
if (!localStorage.getItem("todoList")) {
  localStorage.setItem("todoList", JSON.stringify(todoList));
} else {
  todoList = JSON.parse(localStorage.getItem("todoList"));
}
// 显示遮罩层
function showFade() {
  document.querySelector(".fade").classList.add("show");
  document.querySelector(".wrap").classList.add("coverAnimation");
  document.querySelector(".fade .wrap input").value = "";
}
// 隐藏遮罩层
function hideFade() {
  var editId = sessionStorage.getItem("editId");
  if(editId) {
    for(var i = 0; i < todoList.length; i++) {
      if(todoList[i].id == editId) {
        todoList[i].content = document.querySelector(".fade .wrap input").value;
      }
    }
    localStorage.setItem("todoList", JSON.stringify(todoList));
    showList(JSON.parse(localStorage.getItem("todoList")));
  }else {
    addList();
  }
  sessionStorage.removeItem("editId");
  document.querySelector(".fade").classList.remove("show");
}
//渲染清单列表
function showList(list) {
  var html = "";
  for (var i = 0; i < list.length; i++) {
    if (list[i].status === "0") {
      html +=
        '<p data-id="' +
        list[i].id +
        '" class="item"><i class="iconfont2 selected">&#xe61d;</i><i class="iconfont1 selected hide">&#xe61e;</i><span class="text">' +
        list[i].content +
        "</span><span class='delete'><i class='iconfont3'>&#xe656;</i></span><span class='edit'><i class='iconfont3'>&#xe600;</i></span></p>";
    } else if (list[i].status === "1") {
      html +=
        '<p data-id="' +
        list[i].id +
        '" class="item"><i class="iconfont2 selected hide">&#xe61d;</i><i class="iconfont1 selected">&#xe61e;</i><span class="text over">' +
        list[i].content +
        "</span><span class='delete'><i class='iconfont3'>&#xe656;</i></span><span class='edit'><i class='iconfont3'>&#xe600;</i></span></p>";
    }
  }
  document.querySelector(".todolist").innerHTML = html;
}
// 添加清单
function addList() {
  // 新增列表项
  var newItem = {
    id: todoList.length ? todoList[todoList.length - 1].id + 1 : 1,
    content: "",
    status: "0",
  };
  // 添加项到清单列表
  content = document.querySelector(".fade .wrap input").value;
  newItem.content = content;
  newItem.id = todoList.length ? todoList[todoList.length - 1].id + 1 : 1;
  if (content) {
    todoList.push(newItem);
    localStorage.setItem("todoList", JSON.stringify(todoList));
    showList(JSON.parse(localStorage.getItem("todoList")));
  } else {
    return;
  }
}
// 删除清单
function deleteList(id) {
  for (var i = 0; i < todoList.length; i++) {
    if (todoList[i].id == id) {
      todoList.splice(i, 1);
    }
  }
  localStorage.setItem("todoList", JSON.stringify(todoList));
  showList(JSON.parse(localStorage.getItem("todoList")));
}
// 编辑清单
function editList(id) {
  showFade();
  sessionStorage.setItem("fadetype", 'edit');
  for (var i = 0; i < todoList.length; i++) {
    if (todoList[i].id == id) {
      sessionStorage.setItem("editId", id);
      document.querySelector(".fade .wrap input").value = todoList[i].content;
    }
  }
}
showList(JSON.parse(localStorage.getItem("todoList")));
// 完成或取消清单
document.querySelector(".todolist").addEventListener("click", function (e) {
  var evt = e || window.event;
  var target = evt.target;
  // 完成或取消清单
  if (
    target &&
    (target.classList.contains("item") ||
      target.classList.contains("selected") ||
      target.classList.contains("text"))
  ) {
    if (target.classList.contains("item")) {
      for (var i = 0; i < todoList.length; i++) {
        if (target.dataset.id == todoList[i].id) {
          todoList[i].status === "0"
            ? (todoList[i].status = "1")
            : (todoList[i].status = "0");
        }
      }
      localStorage.setItem("todoList", JSON.stringify(todoList));
      showList(JSON.parse(localStorage.getItem("todoList")));
    } else if (
      target.classList.contains("text") ||
      target.classList.contains("selected")
    ) {
      for (var i = 0; i < todoList.length; i++) {
        if (target.parentElement.dataset.id == todoList[i].id) {
          todoList[i].status === "0"
            ? (todoList[i].status = "1")
            : (todoList[i].status = "0");
        }
      }
      localStorage.setItem("todoList", JSON.stringify(todoList));
      showList(JSON.parse(localStorage.getItem("todoList")));
    }
  }
  // 删除清单项
  if (
    target.parentElement &&
    target.parentElement.classList.contains("delete")
  ) {
    deleteList(target.parentElement.parentElement.dataset.id);
  }
  // 编辑清单项
  if (target.parentElement && target.parentElement.classList.contains("edit")) {
    editList(target.parentElement.parentElement.dataset.id);
  }
});
// 显示遮罩层
document.querySelector(".add").addEventListener("click", showFade);
// 隐藏遮罩层
document.querySelector(".fade").addEventListener("click", hideFade);
// 阻止遮罩层冒泡
document.querySelector(".wrap").addEventListener("click", function (e) {
  e ? e.stopPropagation() : (window.event.cancelBubble = true);
});
