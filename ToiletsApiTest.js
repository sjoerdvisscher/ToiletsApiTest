var Toilets
var Elevators

if (Meteor.isClient) {
  Toilets = new Mongo.Collection("toilets");
  Meteor.subscribe("toilets");

  Elevators = new Mongo.Collection("elevators");
  Meteor.subscribe("elevators");

  Template.hello.helpers({
    toilet: function () {
      return Toilets.find({})
    },
    elevator: function () {
      return Elevators.find({})
    }
  });
}

if (Meteor.isServer) {
  var ToiletsServer
  Meteor.startup(function () {
    ToiletsServer = DDP.connect("wclights.q070.nl");
    Toilets = new Mongo.Collection("toilets", ToiletsServer)
    ToiletsServer.subscribe("toilets");
    ToiletsServer.subscribe("elevators");
  });

  Meteor.methods({
    status: function() {
      console.log(ToiletsServer.status());
      return ToiletsServer.status();
    }
  })

  Meteor.publish("toilets", function() {
    return Toilets.find({});
  })
  Meteor.publish("elevators", function() {
    return Elevators.find({});
  })


}
