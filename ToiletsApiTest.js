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
  var ToiletsServer
  Meteor.startup(function () {
    ToiletsServer = DDP.connect("wclights.q070.nl:3000");
    Toilets = new Mongo.Collection("toilets", ToiletsServer)
    ToiletsServer.subscribe("toilets");
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
}
