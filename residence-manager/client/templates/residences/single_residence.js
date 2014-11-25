Template.singleResidence.helpers({
  rentable: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.tenantNames, userId)) {
      return 'rentable';
    } else {
      return 'rented';
    }
  }
});

Template.singleResidence.events({
  'click .rentable': function(e) {
    e.preventDefault();
    Meteor.call('rent', this._id);
  }
});