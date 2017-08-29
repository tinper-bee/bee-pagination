/**
 * @title 少页数Pagination
 * @description 所有页数均显示。
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Pagination from '../../src';

export default class Demo1 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activePage:1
		}
	}
	handleSelect(eventKey) {
	    this.setState({
	      activePage: eventKey
	    });
	}
	render() {
	    return (
	      <div>
	        <Pagination
	        	boundaryLinks
		        items={10}
		        activePage={this.state.activePage}
		        onSelect={this.handleSelect.bind(this)} />
	      </div>
	    );
	}
}