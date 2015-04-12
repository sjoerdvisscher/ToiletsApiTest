var Toilets
var Lifts

if (Meteor.isClient) {
  Toilets = new Mongo.Collection("toilets");
  Meteor.subscribe("toilets");

  Lifts = new Mongo.Collection("lifts");
  Meteor.subscribe("lifts");

  Template.hello.helpers({
    toilet: function () {
      return Toilets.find({})
    },
    lift: function () {
      return Lifts.find({})
    }
  });
}

if (Meteor.isServer) {
  var ToiletsServer
  var LiftsServer
  Meteor.startup(function () {
    ToiletsServer = DDP.connect("wclights.q070.nl");
    Toilets = new Mongo.Collection("toilets", ToiletsServer)
    ToiletsServer.subscribe("toilets");

    LiftsServer = DDP.connect("10.42.35.50");
    Lifts = new Mongo.Collection("lifts", LiftsServer);
    LiftsServer.subscribe("lifts");
  });

  Meteor.methods({
    status: function() {
      console.log(ToiletsServer.status());
      console.log(LiftsServer.status());
      return ToiletsServer.status();
    }
  })

  Meteor.publish("toilets", function() {
    return Toilets.find({});
  })
  Meteor.publish("lifts", function() {
    return Lifts.find({});
  })


}
