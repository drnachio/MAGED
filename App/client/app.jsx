/**
 * Created by Marcos on 10/10/2015.
 */
App = React.createClass({

    // This mixin makes the getMeteorData method work
    mixins: [ReactMeteorData],

    // Loads items from the Tasks collection and puts them on this.data.tasks
    getMeteorData() {
        return {
            tasks: Tasks.find({}).fetch()
        }
    },

    renderTasks() {
        // Get tasks from this.data.tasks
        return this.data.tasks.map((task) => {
            return <Task key={task._id} task={task} />;
        });
    }
});