import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../template/grid'
import IconButton from '../template/iconButton'
import { changeDescription, search } from './todoActions'

class TodoForm extends Component  {
    constructor(props) {
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
    }

    componentDidMount() {
        this.props.search()
    }
    

    keyHandler(e) {
        if(e.key === 'Enter') {
            e.shiftKey ? this.props.handleSearch() : this.props.handleAdd()
        } else if (e.key === 'Escape') {
            props.handleClear()
        }
    }

    render() {
        return (
            <div role="form" className="todoForm">
                <Grid cols="12 9 10">
                    <input id="description" className="form-control"
                        placeholder="Adicione uma tarefa"
                        onChange={this.props.changeDescription}
                        value={this.props.description}
                        onKeyUp={this.keyHandler}/>
                </Grid>
                <Grid cols="12 2 2">
                    <IconButton style='primary' icon='plus' 
                        onClick={this.props.handleAdd}></IconButton>
                    <IconButton style='info' icon='search' 
                        onClick={this.props.handleSearch}></IconButton>
                    <IconButton style='default' icon='close' 
                        onClick={this.props.handleClear}></IconButton>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({description: state.todo.description })
const mapDispatchToProps = dispatch => bindActionCreators({ changeDescription, search }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)