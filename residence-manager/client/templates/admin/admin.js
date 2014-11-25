Template.adminItem.helpers({
  adminItem: function() {
    return Meteor.users.find({});
  }
});