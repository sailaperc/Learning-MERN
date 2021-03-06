import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

import { connect } from 'react-redux';
import {getItems, deleteItem} from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component{

    static propTypes = {
        auth : PropTypes.bool.isRequired,
        getItems: PropTypes.func.isRequired,
        deleteItem: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.getItems();
    }

    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    };

    render(){
        const { items } = this.props.item;
        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="shooping-list">
                        {items.map(({_id, name}) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    {this.props.isAuthenticated ? 
                                    (
                                    <Button
                                        className="btn-rmv"
                                        color="danger"
                                        size="sm"
                                        onClick=  { this.onDeleteClick.bind(this, _id)} 
                                    >&times;</Button>)
                                    : null } 
                                   {name}
                                </ListGroupItem>
                            </CSSTransition>
                     ))}                     
                    </TransitionGroup>
                </ListGroup>
            </Container>
        ); 
    }
}


const mapStateToProps = (state) => ({
    item : state.item,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, 
    {getItems, deleteItem})(ShoppingList);