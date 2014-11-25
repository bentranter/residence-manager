Template.residenceItem.helpers({
  rentable: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.tenantNames, userId)) {
      return 'rentable';
    } else {
      return 'rented';
    }
  }
});