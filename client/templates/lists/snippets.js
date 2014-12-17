TextSnippets = new Meteor.Collection("textSnippets");

if (Meteor.isClient) {


    Template.snippets.helpers({
        returnTags: function() {

var snippets = TextSnippets.find({}).fetch()

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
        returnSnippets: function() {
            var currentUser = Meteor.userId();

            var tago = Session.get("tagName");
            return TextSnippets.find({tags: {$in: [tago] }})
        },
        highlightedItem: function() {
            var itemId = this._id;
            var selectedItem = Session.get('selectedSnippet');
            if (selectedItem === itemId) {
                return 'selectedSnippet'
            }
        },
        showDeleteButton: function() {
            var itemId = this._id;
            var showDeleteButton = Session.get("selectedSnippet");
            if (showDeleteButton === itemId) {
                return true;
            }
        }

    })

    Template.snippets.events({
        'mouseenter .snippetBox': function() {
            var itemId = this._id;
            console.log(itemId);
            Session.set("selectedSnippet", itemId);
        },
        'click .delete': function() {
            var selectedSnippet = Session.get("selectedSnippet");
            TextSnippets.remove(selectedSnippet);
        },
        'click div a': function(e) {
            var tid = $(e.target).text();
            Session.set("tagName", tid);
            var format = (Session.get("tagName"));
            console.log(format);
        }
    })



}