
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Button from 'bee-button';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Pagination from '../src';


const CARET = <i className="uf uf-arrow-down"></i>;

const CARETUP = <i className="uf uf-arrow-up"></i>;


var Demo1 = require("./demolist/Demo1");var Demo2 = require("./demolist/Demo2");var Demo3 = require("./demolist/Demo3");var DemoArray = [{"example":<Demo1 />,"title":" 少页数Pagination","code":"/**\n * @title 少页数Pagination\n * @description 所有页数均显示。\n */\n\nimport React, { Component } from 'react';\nimport Pagination from 'bee-pagination';\n\nclass Demo1 extends React.Component {\n\tconstructor(props) {\n\t\tsuper(props);\n\t\tthis.state = {\n\t\t\tactivePage:1\n\t\t}\n\t}\n\thandleSelect(eventKey) {\n\t    this.setState({\n\t      activePage: eventKey\n\t    });\n\t}\n\trender() {\n\t    return (\n\t      <div>\n\t        <Pagination\n\t        \tboundaryLinks\n\t\t        items={10}\n\t\t        activePage={this.state.activePage}\n\t\t        onSelect={this.handleSelect.bind(this)} />\n\t      </div>\n\t    );\n\t}\n}\n\n","desc":" 所有页数均显示。"},{"example":<Demo2 />,"title":" 多页数Pagination","code":"/**\n * @title 多页数Pagination\n * @description 可根据参数设置功能按钮的显示，部分页数隐藏。\n */\n\nimport React, { Component } from 'react';\nimport Pagination from 'bee-pagination';\n\nclass Demo2 extends React.Component {\n\tconstructor(props) {\n\t\tsuper(props);\n\t\tthis.state = {\n\t\t\tactivePage:1\n\t\t}\n\t}\n\thandleSelect(eventKey) {\n\t    this.setState({\n\t      activePage: eventKey\n\t    });\n\t}\n\trender() {\n\t    return (\n\t      <div>\n\t        <Pagination\n\t        \tfirst\n\t        \tlast\n\t        \tprev\n\t        \tnext\n\t        \tboundaryLinks\n\t\t        items={20}\n\t\t        maxButtons={5}\n\t\t        activePage={this.state.activePage}\n\t\t        onSelect={this.handleSelect.bind(this)} />\n\t      </div>\n\t    );\n\t}\n}\n","desc":" 可根据参数设置功能按钮的显示，部分页数隐藏。"},{"example":<Demo3 />,"title":" 有间隔Pagination","code":"/**\n * @title 有间隔Pagination\n * @description 有间隔Pagination\n */\n\nimport React, { Component } from \"react\";\nimport Pagination from \"../../src\";\n\nclass Demo3 extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      activePage: 1\n    };\n  }\n  handleSelect(eventKey) {\n    this.setState({\n      activePage: eventKey\n    });\n  }\n  render() {\n    return (\n      <Pagination\n        prev\n        next\n        size=\"sm\"\n        gap={true}\n        items={5}\n        maxButtons={5}\n        activePage={this.state.activePage}\n        onSelect={this.handleSelect.bind(this)}\n      />\n    );\n  }\n}\n\n","desc":" 有间隔Pagination"}]


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
