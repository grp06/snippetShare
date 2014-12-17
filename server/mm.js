Meteor.methods({

    'transferSnippet': function(field1, field2, value1) { // k,v will be passed in from the DDP client.
        console.log("got a push request")
        var date = moment().format()
        var tag = [];
        tag.push(value1[1])



        TextSnippets.insert({
            snippetContent: value1[0],
            tags: tag,
            date: date,
        });



    }
})

