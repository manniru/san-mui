import san from 'san';

export default class THead extends san.Component {
    static template = `<thead><slot></slot></thead>`;

    static messages = {
        'UI:tr-inited': function (e) {
            let tr = e.target;
            tr.data.set('pos', 'thead');
            tr.data.set('tableSelectable', this.data.get('tableSelectable'));

            this.tr = tr;
        }
    };

    inited() {
        this.dispatch('UI:thead-inited');
    }

    disposed() {
        this.tr = null;
    }

    updateSelectAllState(selectAll) {
        if (this.tr) {
            this.tr.data.set('selected', selectAll);
        }
    }
}
