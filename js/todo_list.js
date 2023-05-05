// 未完了のtodo配列
const todoList = [];
// 実施済みのtodo配列
const doneTodoList = [];
// 追加のform要素を取得
const addTodo = document.querySelector('#addTodo');
// 未実施todoのDOMツリーを取得
const todoNotDone = document.querySelector('#todoNotDone');

// 配列の最後尾要素を表示する関数
function displayArrayLastChild (ary) {
  // 最後尾のindexを取得
  let lastIndex = ary.length;
  // 最後尾の要素を取得
  let lastElement = ary[lastIndex - 1];
  // 表示する内容
  let displayContent = `<li class="c-todoList--item">
    <div class="c-todoList--left c-checkBtnWrap">
      <input type="checkbox" id="js-checkbox${lastIndex}">
      <label for="js-checkbox${lastIndex}" class="c-checkBtnWrap--inner"></label>
    </div>
    <p class="c-todoList--center">${lastElement}</p>
    <button class="c-todoList--right c-btn">削除</button>
  </li>`;

  return todoNotDone.insertAdjacentHTML("afterbegin", displayContent);
}

function userInputEvent () {
  // ユーザーが入力した値を取得
  let userInput = addTodo.firstElementChild.value;

  // 入力値の空文字判定する
  if(userInput === '') {
    alert('入力して下さい');
  }else {
    // todoListの先頭に追加
    todoList.push(userInput);
    // todoListに新たに追加された先頭要素のみ表示させる。
    displayArrayLastChild(todoList);
  }
}

// todoを新規追加した際、発生するイベント。
addTodo.lastElementChild.addEventListener('click', userInputEvent);