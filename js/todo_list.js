// todo連想配列
const todoList = {};
// todoのNodeを取得
const unCompletedTodoNode = document.querySelector('#unCompletedTodo');
// 実施済みのNodeを取得
const doneTodoNode = document.querySelector('#doneTodo');
// 追加ボタンのNodeを取得
const addBtn = document.querySelector('#addBtn');
//ユーザーが追加ボタンを押した回数。押下時にカウンターを増加させて、IDを一意に割り振る。
let addCounter = 0;
// todoを新規追加した際、発生するイベント。
addBtn.addEventListener('click', () => userInputEvent());

// addBtnがクリックされたとき、最初に発生する関数。
function userInputEvent () {
  // ユーザーの入力値を取得
  let inputTxt = document.querySelector('#inputTxt');
  // 入力値の空文字判定する
  if(inputTxt.value === '') {
    alert('入力して下さい');
  }else {
    // valueを未実施object(unCompetedTodos)に渡す。
    todoList[`js-todo${addCounter}`] = inputTxt.value;
    // valueに空文字を渡す。
    inputTxt.value = '';
    // 新たに追加された要素を表示
    displayAddItem(todoList, `js-todo${addCounter}`, unCompletedTodoNode);
    // カウンターをインクリメントする。
    addCounter++;
  }
}
// 連想配列に追加されたプロパティを表示する関数
function displayAddItem (obj, propertyName, parentNode) {
  // 追加する子ノードを作成
  let childNode = createLiTag();

  // チェックボタンを生成
  let label = createCheckBtn();
  label.firstElementChild.id = propertyName;
  // チェックボックスをクリックしたときのイベント
  label.firstElementChild.addEventListener('click', () => {
     // 現在いる親ノードを特定
    let currentParentNode = childNode.parentNode;
    // 親ノードの切り替えを行うう条件分岐
    if(currentParentNode === unCompletedTodoNode) {
      deleteNode(unCompletedTodoNode, childNode);
      addNode(doneTodoNode, childNode);
      // 親ノードを実施済みに切り替え
      currentParentNode === doneTodoNode;
    }else {
      deleteNode(doneTodoNode, childNode);
      addNode(unCompletedTodoNode, childNode);
      // 親ノードを未実施に切り替え
      currentParentNode === unCompletedTodoNode;
    }
  });

  // pタグを生成
  let p = createPTag();
  console.log(p);
  p.textContent = obj[propertyName];
  
  // 削除ボタンを生成
  let button = deleteBtn();
  // ボタンを押したときの、イベント
  button.addEventListener('click', () => {
    // 現在いる親ノードを特定
    let currentParentNode = childNode.parentNode;
    deleteProperty (obj, propertyName);
    deleteNode (currentParentNode, childNode);
  });
  
  // 子ノードに孫要素を追加する。
  childNode.appendChild(label);
  childNode.appendChild(p);
  childNode.appendChild(button);
  
  // 親ノードの先頭に追加
  parentNode.prepend(childNode);
}
// オブジェクトから対象のプロパティを削除
function deleteProperty (targetObj, targetProperty) {
  delete targetObj[targetProperty];
}
// 親ノードから対象ノードを削除
function deleteNode (parentNode, deleteNode) {
  parentNode.removeChild(deleteNode);
}
// 親ノードに対象ノードを追加
function addNode (parentNode, addNode) {
  parentNode.prepend(addNode);
}
// liタグの生成
function createLiTag () {
  let li = document.createElement('li');
  li.className = 'c-todoList--item';

  return li;
}
// チェックボタンの生成
function createCheckBtn () {
  let label = document.createElement('label');
  label.className = 'c-todoList--left c-checkBtn';
  let input = document.createElement('input');
  input.type = 'checkbox';
  let span = document.createElement('span');
  label.appendChild(input);
  label.appendChild(span);

  return label;
}
// Pタグを生成
function createPTag () {
  let p = document.createElement('p');
  p.className ='c-todoList--center';

  return p;
}
// 削除ボタンを生成
function deleteBtn () {
  let button = document.createElement('button');
  button.className = `c-todoList--right c-btn`;
  button.textContent = '削除';

  return button;
}