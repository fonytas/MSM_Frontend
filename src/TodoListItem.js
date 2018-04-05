import React from 'react';


class TodoListItem extends React.Component {
    constructor(props) {
        super(props);
        this.onClickClose = this.onClickClose.bind(this);
    }
    onClickClose() {
        var index = parseInt(this.props.index);
        this.props.removeItem(index);
    }

    render () {
        return(
            <li className="list-group-item ">
                    {this.props.item.value}
                    <button type="button" className="close"
                            onClick={this.onClickClose}>&times;</button>
            </li>
        );
    }
}

export default TodoListItem