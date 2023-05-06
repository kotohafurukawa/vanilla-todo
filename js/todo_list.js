// todo連想配列childBtnElement
const unCompletedTodos = {};
// 実施済のtodo連想配列
const doneTodos = {};
// 追加のform要素を取得
const addTodoBtn = document.querySelector('#addTodo').lastElementChild;
// todoのDOMツリーを取得
const todo = document.querySelector('#todo');
// 実施済みのDOMツリーを取得
const doneTodo = document.querySelector('#doneTodo');
//ユーザーが追加ボタンを押した回数。押下時にカウンターを増加させて、IDを一意に割り振る。
let addCounter = 0;

// ユーザーの入力値を配列に追加
function userInputEvent () {
  // ユーザーの入力値を取得
  let userInput = addTodo.querySelector('input[type="text"]').value;
  // 入力値の空文字判定する
  if(userInput === '') {
    alert('入力して下さい');
  }else {
    unCompletedTodos[`js-todo${addCounter}`] = userInput;
    // 新たに追加された要素を表示
    displayAddItem(unCompletedTodos, `js-todo${addCounter}`, todo);
    addCounter++;
  }
}
// 連想配列に追加されたtodoを先頭に表示させる。
function displayAddItem (obj, property, domTree) {
  // 追加するDOMツリーを生成
  // 追加するノードの一番上の親要素
  let parentElement = document.createElement('li');
  parentElement.className = 'c-todoList--item';

  // チェックボタンを生成
  let childCheckElement = document.createElement('label');
  childCheckElement.className = 'c-todoList--left c-checkBtn';
  let input = document.createElement('input');
  input.type = 'checkbox';
  input.id = property;
  let span = document.createElement('span');
  childCheckElement.appendChild(input);
  childCheckElement.appendChild(span);

  // テキストを生成
  let childTxtElement = document.createElement('p');
  childTxtElement.className ='c-todoList--center';
  childTxtElement.textContent = obj[property];

  // 削除ボタンを生成
  let childBtnElement = document.createElement('button');
  childBtnElement.className = 'c-todoList--right c-btn';
  childBtnElement.textContent = '削除';

  // 親要素に追加していく
  parentElement.appendChild(childCheckElement);
  parentElement.appendChild(childTxtElement);
  parentElement.appendChild(childBtnElement);

  // 未実施の先頭に追加
  domTree.prepend(parentElement);
}
// チェックボタン押下時に、未実施→実施済みにデータの移動あるいはその逆。
// 追加された連想配列は、DisplayAddItem関数を実行する。
function handleTodoChange (addObject, removeObject, addDom, removeDom, targetProperty) {
  addObject[targetProperty.id] = removeObject[targetProperty.id];
  let targetNode = targetProperty.closest('.c-todoList--item');
  removeDom.removeChild(targetNode);
  delete removeObject[targetProperty.id];
  displayAddItem(addObject, targetProperty.id, addDom);
}
// todoを新規追加した際、発生するイベント。
addTodoBtn.addEventListener('click', userInputEvent);
// 未実施のtodoにチェックをつけた際、発火するイベント
todo.addEventListener('change', function(event) {
  handleTodoChange(doneTodos, unCompletedTodos, doneTodo, todo, event.target);
});
// 実施済みのtodoにチェックをつけた際、発火するイベント
doneTodo.addEventListener('change', function(event) {
  handleTodoChange(unCompletedTodos, doneTodos, todo, doneTodo, event.target);
});