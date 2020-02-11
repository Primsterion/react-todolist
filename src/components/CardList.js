import React, {Component} from 'react';
import Card from './Card.js';

export default class CardList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cardKey: localStorage.getItem('cardKey') !== null ? parseInt(localStorage.getItem('cardKey')) : 0,
            edit: false,
            currentComponent: null,
            indexComponent: null,
            cardsData: localStorage.getItem('cardsData') !== null ? JSON.parse(localStorage['components']) : []
        };
    }

    addElem = () => {
        let title = this.refs.titleInput.value;
        let content = this.refs.contentInput.value;
        let id = parseInt(this.state.cardKey);
        this.state.cardsData.push({id: id, title: title, content: content});
        this.refs.titleInput.value = '';
        this.refs.contentInput.value = '';
        this.setState({cardKey: parseInt(this.state.cardKey) + 1});
        localStorage['components'] = JSON.stringify(this.state.cardsData);
        localStorage['cardKey'] = this.state.cardKey + 1;
    };

    getIndex = (id) => {
        let length = this.state.cardsData.length;
        let components = this.state.cardsData.concat();
        let index = 0;
        for (let i = 0; i < length; i++) {
            if (components[i].id === id) {
                return index;
            } else {
                index++;
            }
        }
    };

    delElem = (id) => {
        const index = this.getIndex(id);
        let newComponents = this.state.cardsData.concat();
        newComponents.splice(index, 1);
        this.setState({cardsData: newComponents});
        localStorage['components'] = JSON.stringify(newComponents);
    };

    editElem = (id) => {
        const index = this.getIndex(id);
        this.refs.titleInput.value = this.state.cardsData[index].title;
        this.refs.contentInput.value = this.state.cardsData[index].content;
        this.setState({currentComponent: index, edit: true});
    };

    saveEditInfo = () => {
        let arr = this.state.cardsData.concat();
        let id = this.state.currentComponent;
        const newTitle = this.refs.titleInput.value;
        const newContent = this.refs.contentInput.value;
        arr[id]["title"] = newTitle;
        arr[id]["content"] = newContent;
        this.refs.titleInput.value = '';
        this.refs.contentInput.value = '';
        this.setState({cardsData: arr, currentComponent: null, edit: false});
        localStorage['components'] = JSON.stringify(this.state.cardsData);

    };

    clearList = () => {
        const arr = [];
        this.setState({cardsData: arr});
        localStorage['components'] = JSON.stringify(arr);
        localStorage['cardKey'] = 0;
    };


    render = () => {
        if (this.state.cardsData.length === 0) {
            return (
                <div className="container text-center">
                    <div className="add-block text-center">
                        <input type="text" className="form-control ml-auto mr-auto mb-3 mt-3" ref='titleInput'
                               placeholder="Заголовок..."/>
                        <input type="text" className="form-control ml-auto mr-auto mb-3" ref='contentInput'
                               placeholder="Описание..."/>
                        <button className="btn btn-primary mb-5"
                                onClick={this.addElem}>Добавить элемент</button>
                    </div>
                    <div className="row">
                    </div>
                    <h2>Добавьте элемент</h2>
                </div>
            )
        } else if (this.state.edit === true) {
            return (
                <div className="container text-center">
                    <div className="add-block text-center">
                        <input type="text" className="form-control ml-auto mr-auto mb-3 mt-3" ref='titleInput'
                               placeholder="Заголовок..."/>
                        <input type="text" className="form-control ml-auto mr-auto mb-3" ref='contentInput'
                               placeholder="Описание..."/>
                        <button className="btn btn-primary mb-5" onClick={this.saveEditInfo}>Сохранить</button>
                    </div>
                    <div className="row">
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container">
                    <div className="add-block">
                        <input type="text" className="form-control ml-auto mr-auto mb-3 mt-3" ref='titleInput'
                               placeholder="Заголовок..."/>
                        <input type="text" className="form-control ml-auto mr-auto mb-3" ref='contentInput'
                               placeholder="Описание..."/>
                        <button className="btn btn-primary mb-5" onClick={this.addElem}>Добавить элемент</button>
                    </div>
                    <div className="row">
                        {this.state.cardsData.map((item) => {
                            return <Card
                                key={item.id}
                                title={item.title}
                                content={item.content}
                                del={this.delElem.bind(this, item.id)}
                                edit={this.editElem.bind(this, item.id)}
                            />
                        })}
                    </div>
                    <button className="btn btn-primary" onClick={this.clearList}>Очистить список</button>
                </div>
            );
        }
    }
}