Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
    // This code is executed on the client only

    Meteor.startup(function () {
        // Use Meteor.startup to render the component after the page is ready
        React.render(<App />, document.getElementById("render-target"));

        var mapView = new MAGED.Classes.MapView();
        mapView.start();
    });
}
