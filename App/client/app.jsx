/**
 * Created by Marcos on 10/10/2015.
 */
let executeRender = function(ready){
    console.log(ready);
    if(ready){
        console.log('goRender');
        React.render(<App />, document.getElementById("render-target"));
    }
    else{
        return;
    }
};
Meteor.startup(function () {
    // Use Meteor.startup to render the component after the page is ready
    Meteor.subscribe('allSheets');
    Meteor.subscribe('allCells');
    Meteor.subscribe('allGameObjects');
    console.log('startup');
    Tracker.autorun(function(){
        executeRender(MAGED.Classes.Game.ready.get());
    });
    setTimeout(function(){MAGED.Classes.Game.ready.set(true);}, 4000);
});
Sheet = React.createClass({
    propTypes: {
        // This component gets the task to display through a React prop.
        // We can use propTypes to indicate it is required
        sheet: React.PropTypes.object.isRequired
    },

    getPropertiesValueToShow() {
        let res = '';
        res += '_id: ' + this.props.sheet._id + ' | ';
        res += 'dynamic: ' + this.props.sheet.dynamic + ' | ';
        res += 'height: ' + this.props.sheet.height;
        return res;
    },

    render() {
        return (
            <li>{this.getPropertiesValueToShow()}</li>
        );
    }
});
Cell = React.createClass({
    propTypes: {
        // This component gets the task to display through a React prop.
        // We can use propTypes to indicate it is required
        cell: React.PropTypes.object.isRequired
    },

    getPropertiesValueToShow() {
        let res = '';
        res += '_id: ' + this.props.cell._id + ' | ';
        res += '_x: ' + this.props.cell._x + ' | ';
        res += '_y: ' + this.props.cell._y + ' | ';
        res += '_z: ' + this.props.cell._z + ' | ';
        res += '_h: ' + this.props.cell._h;
        return res;
    },

    renderSheets(){
        return this.props.cell._stack.map((sheetId) => {
            let sheet = MAGED.Collections.Sheets.findOne({_id:sheetId});
            return <Sheet key={sheet._id} sheet={sheet} />;
        });
    },

    render() {
        return (
            <li>
                {this.getPropertiesValueToShow()}
                <ul>
                    {this.renderSheets()}
                </ul>
            </li>
        );
    }
});
App = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
        console.log('getMeteorData()');
        return {
            cells: MAGED.Collections.Cells.find().fetch()
        }
    },

    renderTasks() {
        return this.data.cells.map((cell) => {
            return <Cell key={cell._id} cell={cell} />;
        });
    },

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Cells</h1>
                </header>

                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
});