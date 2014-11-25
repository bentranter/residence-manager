Template.residences.helpers({
  residences: function() {
    return Residences.find({});
  }
});

// You need to signed in to register for a room -- set that up

// Also set up the admin panel where you can delete users and whatever 