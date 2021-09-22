<template>
  <div id="task">

    <!-- Simple header with fixed tabs. -->
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-tabs">
      <header class="mdl-layout__header">
        <div class="mdl-layout__header-row">
          <!-- Title -->
          <span class="mdl-layout-title">TooDo</span>

          <!-- Add spacer, to align navigation to the right -->
          <div class="mdl-layout-spacer"></div>
          <!-- Navigation. We hide it in small screens. -->
            <nav class="mdl-navigation mdl-layout--large-screen-only">
            {{username}}
          </nav>
        </div>

        <!-- New task -->
        <div class="task-create">
          <div class="mdl-textfield mdl-js-textfield">
            <input class="mdl-textfield__input" type="text" v-model="newTodoName" placeholder="New Item...">
          </div>

          <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored" type="submit" v-on:click="createTodo()">
            <i class="material-icons">add</i>
          </button>
        </div>

        <!-- Tabs -->
        <div class="mdl-layout__tab-bar mdl-js-ripple-effect">
          <a href="#fixed-tab-1" class="mdl-layout__tab" v-bind:class="{'is-active': selectedAll}" v-on:click="selectDisplay('all')">All</a>
          <a href="#fixed-tab-2" class="mdl-layout__tab" v-bind:class="{'is-active': selectedActive}" v-on:click="selectDisplay('active')">Active</a>
          <a href="#fixed-tab-3" class="mdl-layout__tab" v-bind:class="{'is-active': selectedComplete}" v-on:click="selectDisplay('complete')">Complete</a>
        </div>
      </header>

      <main class="mdl-layout__content">

        <!-- todo 一覧表示 -->
        <ul class="mdl-list">
          <li class="mdl-list__item" v-for="(todo, key) in filterdTodos" :key="todo.id">
            <span class="mdl-list__item-primary-content">{{todo.name}}</span>
            <span class="mdl-list__item-secondary-action">
              <a href="#" class="mdl-navigation__link large checked" v-if="todo.isComplete==true" v-on:click="updateIsCompleteTodo(todo, key)">✔</a>
              <a href="#" class="mdl-navigation__link large" v-if="todo.isComplete==false" v-on:click="updateIsCompleteTodo(todo, key)">❏</a>
            </span>
          </li>
        </ul>

      </main>
    </div>

  </div>
</template>

<style>
.large {
  font-size: 2em;
}
.checked {
  color: rgb(255,64,129);
}
.is-active {
  color: #ffffff;
  background: rgb(255,64,129);
}
</style>

<script>
import firebase from "firebase";
export default {
  name: "Task",
  data() {
    return {
      username: firebase.auth().currentUser.displayName,
      database: null,
      todosRef: null,
      todos: [],
      showTodoType: "all",
      selectedAll : true,
      selectedActive: false,
      selectedComplete: false,
    };
  },
  created: function () {
    this.database = firebase.database();
    this.uid = firebase.auth().currentUser.uid;
    this.todosRef = this.database.ref("todos/" + this.uid); // '/todos/<uid>/*' 以下を参照する。
    // データに変更があるときに実行される
    var _this = this;
    this.todosRef.on("value", (snapshot) => {
      _this.todos = snapshot.val(); // 再取得して todosに格納する。
    });
  },
  computed: {
    // フィルター実装。showTodoType が変更されると実行される
    filterdTodos: function() {
      if (this.showTodoType == "complete") {
        var complete_list = {};
        for (var key_c in this.todos){
          var todo_c = this.todos[key_c];
          if (todo_c.isComplete == true) {
            complete_list[key_c] = todo_c;
          }
        }
        return complete_list;
      } else if (this.showTodoType == "active") {
        var active_list = {};
        for (var key_a in this.todos){
          var todo_a = this.todos[key_a];
          if (todo_a.isComplete == false) {
            active_list[key_a] = todo_a;
          }
        }
        return active_list;
      }
      return this.todos;
    },
  },
  methods: {
    createTodo: function() {
      if (this.newTodoName == ""){
        return;
      }
      this.todosRef.push({
        name: this.newTodoName,
        isComplete: false
      });
      this.newTodoName = "";
    },
    // 完了・未完了の値の更新
    updateIsCompleteTodo: function(todo, key) {
      if (todo.isComplete == true) {
        todo.isComplete = false;
      } else {
        todo.isComplete = true;
      }
      var updates = {};
      updates[key] = todo;
      this.todosRef.update(updates);
    },
    selectDisplay: function(kind) {
      if (kind == 'all'){
        this.showTodoType = 'all';
        this.selectedAll = true;
        this.selectedActive = false;
        this.selectedComplete = false;
      } else if (kind == 'active'){
        this.showTodoType = 'active';
        this.selectedAll = false;
        this.selectedActive = true;
        this.selectedComplete = false;
      } else if (kind == 'complete') {
        this.showTodoType = 'complete';
        this.selectedAll = false;
        this.selectedActive = false;
        this.selectedComplete = true;
      }
    },
  },
};
</script>