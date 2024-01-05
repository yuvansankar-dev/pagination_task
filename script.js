var tableDataPart = document.getElementById("Table Data");
var tableHeaderPart = document.getElementById("Table Header");

var pagination = document.getElementById("pagination");
var page = 1;
var result;
function loadData(currentPage) {
  page = currentPage;
  var data = result.slice(currentPage * 5 - 5, currentPage * 5);
  console.log(data);
  var row = ["first-row", "second-row", "third-row", "fourth-row", "fifth-row"];
  row.forEach((rowValue, index) => {
    // console.log(rowValue);
    var temp = document.getElementsByClassName(rowValue);
    // console.log(temp);
    temp.forEach((element) => {
      if (element.className.includes("id")) {
        element.innerText = data[index].id;
      } else if (element.className.includes("name")) {
        element.innerText = data[index].name;
      } else {
        element.innerText = data[index].email;
      }
    });
  });
}

var request = new XMLHttpRequest();
request.open(
  "GET",
  "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json"
);
request.send();
request.onload = function () {
  result = JSON.parse(request.response);
  function createPages(pageName, page = undefined) {
    var navigationList = document.createElement("li");
    navigationList.className = "page-item";

    var navigationAnchorTag = document.createElement("a");
    navigationAnchorTag.className = "page-link";
    navigationAnchorTag.setAttribute("href", "#");
    navigationAnchorTag.innerText = pageName;
    navigationAnchorTag.onclick = (event) => {
      loadData(page ? page() : event.target.innerText);
    };

    navigationList.append(navigationAnchorTag);
    pagination.append(navigationList);
  }
  createPages("previous", () => (page == 1 ? 1 : page - 1));
  createPages("first", () => 1);
  var totalPage = Math.ceil(result.length / 5);
  for (i = 1; i <= totalPage; i++) {
    createPages(i);
  }
  createPages("next", () => (page == totalPage ? totalPage : page + 1));
  createPages("last", () => totalPage);
  loadData(1);
};
