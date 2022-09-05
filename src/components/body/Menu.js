import React, {Component} from "react";
import MenuItem from "./MenItem";
import DishDetail from "./DishDetail";
import {CardColumns, Modal, ModalBody, ModalFooter, Button} from 'reactstrap'
import {connect} from 'react-redux';


// rediux
const mapStateToProps = state =>{
    console.log(state);
    return {
        dishes: state.dishes,
        comments: state.comments
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addComment: (dishId,author,rating,comment) => dispatch ({
            type: 'ADD_COMMENT',
            payload: {
                dishId : dishId,
                author : author,
                rating : rating,
                comment : comment,
            }

        }),
    }
}

class Menu extends Component{
    state = {
        selectedDish : null,
        modalOpen :false

    }

    onDishSelect = dish =>{
        this.setState({
            selectedDish:dish
        });
        this.toggleModal();
    }

    toggleModal =()=>{
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }

    render(){
        document.title ="Menu";

        const menu = this.props.dishes.map(item =>{
            return(
                <MenuItem 
                dish={item} 
                key={item.id} 
                DishSelect ={()=>this.onDishSelect(item)}
                />
            );
        })

        let dishDetail = null;
        if(this.state.selectedDish != null){
            const comments = this.props.comments.filter( comment=> {
                return comment.dishId === this.state.selectedDish.id;
            })
            dishDetail = <DishDetail dish = {this.state.selectedDish} comments = {comments} addComment = {this.props.addComment}/>
        }

        return(
            <div className="container">
                <div className="row">
                    <CardColumns>
                        {menu}
                    </CardColumns>
                    <Modal isOpen={this.state.modalOpen}>
                        <ModalBody>
                            {dishDetail}
                        </ModalBody>
                        <ModalFooter>
                            <Button color ="secendary" onClick={this.toggleModal}>Close</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Menu);