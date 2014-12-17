Router.configure({
  layoutTemplate: 'layout',

});

Router.route('/', {name: 'snippets'});
Router.route('/todos', {name: 'todos'});
Router.route('/insertBookForm', {name: 'insertBookForm'});


