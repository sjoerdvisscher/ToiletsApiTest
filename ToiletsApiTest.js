var Toilets

if (Meteor.isClient) {
  Toilets = new Mongo.Collection("toilets");
  Meteor.subscribe("toilets");

  Template.hello.helpers({
    toilet: function () {
      return Toilets.find({})
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    var ToiletsServer = DDP.connect("localhost:3000");
    Toilets = new Mongo.Collection("toilets", ToiletsServer)
    ToiletsServer.subscribe("toilets");
  });

  Meteor.publish("toilets", function() {
    return Toilets.find({});
  })
}
