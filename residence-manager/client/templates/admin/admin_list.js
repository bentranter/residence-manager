Template.admin.helpers({
  adminItem: function() {
    return Meteor.users.find({});
  }
});