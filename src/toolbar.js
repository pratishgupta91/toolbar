import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './toolbar.css';
import print from './img/print.png';
import save from './img/save.png';
import zoomin from './img/plus.png';
import zoomout from './img/minus.png';
import toc from './img/toc.png';
import find from './img/find.png';
import read from './img/read.png';
import rotate from './img/rotate.png';
import layout from './img/layout.png';
import ink from './img/ink.png';
import more from './img/more.png';

class ToolBarButton extends Component {
  render() {
    if(this.props.layout === "cozy" || this.props.layout === "comfortable" || this.props.overflow === false) {
      return (<div className="btn-img"><img src={this.props.type} className="btn-icon" onClick={this.props.handleClick} alt={this.props.alt}/></div>);
    }
    return (<div className="btn-empty"></div>);
  }
}

class ToolBarButtonWithLabel extends Component {
  render() {
    if(this.props.layout === "cozy") {
      return (<div className="button-with-label">
        <div className="btn-label">{this.props.text}</div>
        <ToolBarButton type={this.props.type} alt={this.props.text} layout={this.props.layout} overflow={this.props.overflow}/>
      </div>);
    }
    else {
      return (<div className="button-with-label">
        <ToolBarButton type={this.props.type} layout={this.props.layout} overflow={this.props.overflow}/>
      </div>);
    }
  }
}

class ListDropdownItem extends Component {
  render() {
      return (<li className="list-dropdown-item">
        <ToolBarButtonWithLabel type={read} text="Read Aloud" layout={this.props.layout} overflow={true}/>
      </li>
      );
  }
}

class ListDropDownMenu extends Component {
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  updateDimensions() {
    // if(ReactDOM.findDOMNode(this.refs['toolbarIndentifier'])) {
    //   var rect = ReactDOM.findDOMNode(this.refs['toolbarIndentifier']).getBoundingClientRect();
    //   this.setState({x: rect.x, y: rect.y + rect.height});
    // }
    // else {
    //   this.setState({x: 0, y: 0});
    // }
  }

  componentWillMount() {
    this.updateDimensions();
  }

  render() {
      return (<ul className="list-dropdown-menu" style={{top: this.props.y, left: this.props.x, visibility: this.props.visibility}}>
        <ListDropdownItem type={read} text="this.props.text" layout="cozy"/>
        <ListDropdownItem type={read} text="this.props.text" layout="cozy"/>
        <ListDropdownItem type={read} text="this.props.text" layout="cozy"/>
      </ul>);
  }
}

class ToolBarMenuButton extends Component {
  constructor(props) {
    super(props);
    this.moreButton = React.createRef();
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.props.showMoreMenuAt(ReactDOM.findDOMNode(this.moreButton.current).getBoundingClientRect());
  }

  render() {
    if(this.props.shouldShowMoreButton) {
      return (
        <ToolBarButton type={more} text={this.props.text} ref={this.moreButton} layout={this.props.layout} overflow={false} handleClick={this.handleClick}/>
      );
    }
    return (<div className="btn-empty"></div>);
  }
}


class ToolBarGroup extends Component {
  updateDimensions() {
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
      window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    //alert("yo");
    if(this.props.align === "left") {
      return (<div className="react-toolbar-group-left">
        <ToolBarButton type={toc} layout={this.props.layout} overflow={false}></ToolBarButton>
        <ToolBarButton type={find} layout={this.props.layout} overflow={false}></ToolBarButton>
      </div>);
    }
    if(this.props.align === "right") {
      return (<div className="react-toolbar-group-right">
        <ToolBarButton type={zoomin} layout={this.props.layout} overflow={false}></ToolBarButton >
        <ToolBarButton type={zoomout} layout={this.props.layout} overflow={false}></ToolBarButton>
        <ToolBarButton type={rotate} layout={this.props.layout} overflow={false}></ToolBarButton>
        <ToolBarButton type={layout} layout={this.props.layout} overflow={true}></ToolBarButton>
        <ToolBarButtonWithLabel type={read} text="Read Aloud" layout={this.props.layout} overflow={true}/>
        <ToolBarButtonWithLabel type={ink} text="Annotate" layout={this.props.layout} overflow={true}/>
        <ToolBarButton type={print} layout={this.props.layout} overflow={true}></ToolBarButton>
        <ToolBarButton type={save} layout={this.props.layout} overflow={true}></ToolBarButton>
        <ToolBarMenuButton layout={this.props.layout} shouldShowMoreButton={this.props.shouldShowMoreButton} showMoreMenuAt={this.props.showMoreMenuAt}/>
      </div>);
    }
  }
}

class ToolBar extends Component {
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.showMoreMenuAt = this.showMoreMenuAt.bind(this);

    this.state = {
      width: 0,
      height: 0,
      moreMenuX: 0,
      moreMenuY: 0,
      moreMenuVisibility: "hidden"
    }
  }

  updateDimensions() {
    this.setState({width: window.innerWidth, height: window.innerHeight});
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
      window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions);
  }

  showMoreMenuAt(rect) {
    //alert(rect);
    this.setState({moreMenuX: rect.x, moreMenuY: rect.y + rect.height, moreMenuVisibility: 'visible'});
  }

  render() {
    var layoutType = "";
    if(this.state.width > 900) layoutType = "cozy";
    else if(this.state.width > 450) layoutType = "comfortable";
    else layoutType = "compact";

    var showMoreButton = layoutType === "compact" ? true : false;

    return (<div className="react-toolbar" style={{width : this.state.width - 20}}>
        <ToolBarGroup align="left" layout={layoutType}/>
        <ToolBarGroup align="right" layout={layoutType} shouldShowMoreButton={showMoreButton} showMoreMenuAt={this.showMoreMenuAt}/>
        <ListDropDownMenu visibility={this.state.moreMenuVisibility} x={this.state.moreMenuX} y={this.state.moreMenuY}/>
      </div>);
  }
}

export default ToolBar;
