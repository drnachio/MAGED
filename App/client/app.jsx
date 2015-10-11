/**
 * Created by Marcos on 10/10/2015.
 */
var startTime = new Date().getTime();
let getSheets = function(){
    console.log('allCellsloaded: ' + (new Date().getTime() - startTime) + 'ms');
    //
    let sheetIds = [];
    console.log('start getIds' + (new Date().getTime() - startTime) + 'ms');
    MAGED.Collections.Cells.find().forEach(function (obj) {
        sheetIds.push(obj._stack);
        return;
    });
    sheetIds = _.flatten(sheetIds);
    Meteor.call('getSheetsCountFromIds', sheetIds, function (err, res) {
        if (err) {
            console.error(err);
        }
        MAGED.Classes.Game.TotalSheetsInView = res;
        console.log('all sheets (' + res + ')' + (new Date().getTime() - startTime) + 'ms');
    });
    Meteor.subscribe('sheets', sheetIds);
    console.log('subscribe to sheets' + (new Date().getTime() - startTime) + 'ms');
};
Meteor.startup(function () {
    // Use Meteor.startup to render the component after the page is ready
    let x1 = y1 = z1 = -20;
    let x2 = y2 = z2 = 20;
    Meteor.subscribe('cells', x1, x2, y1, y2, z1, z2);
    console.log('startup');
    Meteor.call('getInViewCellCount', x1, x2, y1, y2, z1, z2, function(err, res) {
        if (err) {
            console.error(err);
        }
        MAGED.Classes.Game.TotalCellsInView = res;
    });
    MAGED.Classes.Game.cellsObserver = MAGED.Collections.Cells.find().observeChanges({
        added(id, fields){
            if(MAGED.Collections.Cells.find().count() === MAGED.Classes.Game.TotalCellsInView) {
                getSheets();
                MAGED.Classes.Game.cellsObserver.stop();
                delete MAGED.Classes.Game.cellsObserver;
            }
        }
    });
    MAGED.Classes.Game.sheetsObserver = MAGED.Collections.Sheets.find().observeChanges({
        added(id, fields){
            if(MAGED.Collections.Sheets.find().count() === MAGED.Classes.Game.TotalSheetsInView) {
                console.log('GO RENDER');
                console.log((new Date().getTime() - startTime) + 'ms');
                MAGED.Classes.Game.sheetsObserver.stop();
                React.render(<App />, document.getElementById("render-target"));
                var mapView = new MAGED.Classes.MapView();
                mapView.start();
                mapView.showStats();
                delete MAGED.Classes.Game.sheetsObserver;
            }
        }
    });
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
        res += 'height: ' + this.props.sheet.height + ' | ';
        res += '_class: ' + this.props.sheet._class;
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