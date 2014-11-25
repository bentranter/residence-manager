Posts = new Mongo.Collection('posts');

Posts.allow({
  update: function(userId, post) { 
    return ownsDocument(userId, post); 
  }
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'title', 'comment').length > 0);
  }
});

Posts.deny({
  update: function(userId, post, fieldNames, modifier) {
    var errors = validatePost(modifier.$set);
    return errors.title;
  }
});

validatePost = function (post) {
  var errors = {};

  if (!post.title)
    errors.title = "Please fill in a headline";

  if (!post.comment)
    errors.comment = "Please add your comment!";

  return errors;
};

Meteor.methods({
  postInsert: function(postAttributes) {
    check(this.userId, String);
    check(postAttributes, {
      title: String,
      comment: String
    });
    
    var errors = validatePost(postAttributes);
    if (errors.title)
      throw new Meteor.Error('invalid-post', "You must set a title for your post");
    
    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id, 
      author: user.username, 
      submitted: new Date(),
      commentsCount: 0,
      upvoters: [], 
      votes: 0
    });
    
    var postId = Posts.insert(post);
    
    return {
      _id: postId
    };
  },
  
  upvote: function(postId) {
    check(this.userId, String);
    check(postId, String);
    
    var affected = Posts.update({
      _id: postId, 
      upvoters: {$ne: this.userId}
    }, {
      $addToSet: {upvoters: this.userId},
      $inc: {votes: 1}
    });
    
    if (! affected)
      throw new Meteor.Error('invalid', "You weren't able to upvote that post");
  },

  rent: function(residenceId) {
    check(this.userId, String);
    check(residenceId, String);

    var affected = Residences.update({
      _id: residenceId,
      tenantNames: {$ne: this.userId}
    }, {
      $addToSet: {tenantNames: this.userId},
      $inc: {tenants: 1}
    });
    
    if (! affected)
      throw new Meteor.Error('invalid', "You were not able to register for that residence.");
  },

  delete: function(postId) {
    Posts.remove({
      _id: postId
    });
    Comments.remove({
      _id: postId
    });
  }
});
