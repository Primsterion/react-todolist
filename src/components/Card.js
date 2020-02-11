import React, {Component} from 'react';

export default class Card extends Component {

    render() {
        return (
            <div className="col-md-4">
                <div className="card text-white bg-primary mb-3">
                    <div className="card-header">{this.props.title}</div>
                    <div className="card-body">
                        <p className="card-text text-left">{this.props.content}</p>
                    </div>
                    <button type="button" className="btn btn-warning w-75 ml-auto mr-auto mb-2"
                            onClick={this.props.edit}>Редактировать
                    </button>
                    <button type="button" className="btn btn-danger w-75 ml-auto mr-auto mb-2"
                            onClick={this.props.del}>Удалить
                    </button>
                </div>
            </div>

        );
    };
}
