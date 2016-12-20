
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Button from 'bee-button';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Pagination from '../src';


const CARET = <i className="uf uf-chevronarrowdown"></i>;

const CARETUP = <i className="uf uf-chevronarrowup"></i>;


/**
 * @title 少页数Pagination
 * @description 所有页数均显示。
 */

class Demo1 extends React.Component {
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
}/**
 * @title 多页数Pagination
 * @description 可根据参数设置功能按钮的显示，部分页数隐藏。
 */

class Demo2 extends React.Component {
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
	        	first
	        	last
	        	prev
	        	next
	        	boundaryLinks
		        items={20}
		        maxButtons={5}
		        activePage={this.state.activePage}
		        onSelect={this.handleSelect.bind(this)} />
	      </div>
	    );
	}
}var DemoArray = [{"example":<Demo1 />,"title":" 少页数Pagination","code":"/**\n * @title 少页数Pagination\n * @description 所有页数均显示。\n */\n\nclass Demo1 extends React.Component {\n\tconstructor(props) {\n\t\tsuper(props);\n\t\tthis.state = {\n\t\t\tactivePage:1\n\t\t}\n\t}\n\thandleSelect(eventKey) {\n\t    this.setState({\n\t      activePage: eventKey\n\t    });\n\t}\n\trender() {\n\t    return (\n\t      <div>\n\t        <Pagination\n\t        \tboundaryLinks\n\t\t        items={10}\n\t\t        activePage={this.state.activePage}\n\t\t        onSelect={this.handleSelect.bind(this)} />\n\t      </div>\n\t    );\n\t}\n}","desc":" 所有页数均显示。"},{"example":<Demo2 />,"title":" 多页数Pagination","code":"/**\n * @title 多页数Pagination\n * @description 可根据参数设置功能按钮的显示，部分页数隐藏。\n */\n\nclass Demo2 extends React.Component {\n\tconstructor(props) {\n\t\tsuper(props);\n\t\tthis.state = {\n\t\t\tactivePage:1\n\t\t}\n\t}\n\thandleSelect(eventKey) {\n\t    this.setState({\n\t      activePage: eventKey\n\t    });\n\t}\n\trender() {\n\t    return (\n\t      <div>\n\t        <Pagination\n\t        \tfirst\n\t        \tlast\n\t        \tprev\n\t        \tnext\n\t        \tboundaryLinks\n\t\t        items={20}\n\t\t        maxButtons={5}\n\t\t        activePage={this.state.activePage}\n\t\t        onSelect={this.handleSelect.bind(this)} />\n\t      </div>\n\t    );\n\t}\n}","desc":" 可根据参数设置功能按钮的显示，部分页数隐藏。"}]


class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({ open: !this.state.open })
    }

    render () {
        const { title, example, code, desc  } = this.props;
        let caret = this.state.open ? CARETUP : CARET;
        let text = this.state.open ? "隐藏代码" : "查看代码";

        const footer = (
            <Button shape="block" onClick={ this.handleClick }>
                { caret }
                { text }
            </Button>
        );
        return (
            <Col md={12}>
                <h3>{ title }</h3>
                <p>{ desc }</p>
                <Panel collapsible expanded={ this.state.open } colors='bordered' header={ example } footer={footer} footerStyle = {{padding: 0,borderColor: "transparent"}} >
                    <pre><code className="hljs javascript">{ code }</code></pre>
                </Panel>
            </Col>
        )
    }
}

class DemoGroup extends Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
                <Row>
                    {DemoArray.map((child,index) => {

                        return (
                            <Demo example= {child.example} title= {child.title} code= {child.code} desc= {child.desc} key= {index}/>
                        )

                    })}
                </Row>
        )
    }
}

ReactDOM.render(<DemoGroup/>, document.getElementById('tinperBeeDemo'));
