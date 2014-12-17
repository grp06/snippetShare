Todos = new Meteor.Collection("todos");

if (Meteor.isClient){
	
	idVal = Meteor.userId();
	Session.set("showId", idVal);
 
	Template.todos.helpers({
        returnTags: function() {
			var snippets = Todos.find({}).fetch()

			var tags = _(snippets).chain()
			        .pluck('tags')
			        .flatten()
			        .uniq().compact().value();


			var tagsByDate = _(tags).chain()
			    .map(function(tag) { 
			        var snips = _.filter(snippets, function (snip) { 
			        return _.contains(snip.tags,tag);
			        });
			        var maxDate = _.max(snips, function(snip){
			 
			        return moment(snip.date).toDate().getTime();
			        });

			        return {'name':tag,'date':maxDate.date};
			    })
			    .sortBy(function(tag) { 
			        return -moment(tag.date).toDate().getTime();
			    })
			    .value();

			    
			    var done = _(tagsByDate).chain()
			       .pluck('name')
			    .value()

			    return done
        },
        returnTodos: function() {
            var currentUser = Meteor.userId();

            var tago = Session.get("tagName");
            return Todos.find({tags: {$in: [tago] }})
        },
        highlightedItem: function() {
            var itemId = this._id;
            var selectedItem = Session.get('selectedTodo');
            if (selectedItem === itemId) {
                return 'selectedTodo'
            }
        },
        showDeleteTodo: function(){
        	var itemId = this._id;
        	var showDeleteTodo = Session.get("selectedTodo");
        	if(showDeleteTodo === itemId){
        		return true;
        	}
        }
	})



	Template.todos.events({
		'keyup .enterTodo': function(e){
			if (e.which === 13){
				var currentUser = Meteor.userId();
				var todoItem = $('.enterTodo').val();
				var tagText = $('.enterTag').val();
				var todoTag = [];
				todoTag.push(tagText)
				var date = moment().format()
				console.log('hello')

				Todos.insert({
					snippetContent: todoItem,
					tags: todoTag,
					date: date,
				})
				$('.enterTodo').val('');
				var thing = $('.enterTag').val()
				Session.set("tagName", thing)
				var fun = Meteor.users.findOne(Meteor.userId())
				//console.log(fun)
		
			}
		},
		'click div a': function(e){
			var tid = $(e.target).text();
			Session.set("tagName", tid);
			var format = (Session.get("tagName"));
			$(".enterTag").val(tid)
			console.log(format);
		},
        'mouseenter .todoItem': function() {
            var itemId = this._id;
            //console.log(itemId);
            Session.set("selectedTodo", itemId);
        },
        'click .delete': function(){
        	var selectedTodo = Session.get("selectedTodo");
        	Todos.remove(selectedTodo);
        },
        'click .enterTag': function(){
        	$('.enterTag').val('');

        },
        'click .todoItem': function(){
            var itemId = this._id;
            Session.set("selectedTodo", itemId);
            console.log(itemId);

        }
	})
	
}









