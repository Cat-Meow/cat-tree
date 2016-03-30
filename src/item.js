import React, { Component } from 'react';
import { setClass } from 'rs-util';
import List from './list';

export default class Item extends Component {

    static propTypes = {
        data: React.PropTypes.object
    };

    static defaultProps = {
        data: {},
    };

    constructor(props) {
        super(props);
        let status = this.isSelected('open', this.props);
        this.state = {
            open: status,
            selected: status
        };
        this.handleListClick = this.handleListClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    isSelected(type, props) {
        let { active, selected, data, selectKey } = props;
        switch (type) {
            case 'open':
                if (active.length > 0 && active[active.length - 1][selectKey] === props.data[selectKey]) {
                    return this.state ?
                            (this.state.open && active.length === 1 ? false : true) :
                            true;
                }
                break;
            case 'selected':
                if (selected.length > 0 && selected[selected.length - 1][selectKey] === data[selectKey]) {
                    return true;
                }
                break;
        }
        return false;
    }

    handleClick(event) {
        if (this.props.data.children) {
            event.preventDefault();
        }
        this.props.onClick([this.props.data]);
    }

    handleListClick(actives) {
        actives.push(this.props.data);
        this.props.onClick(actives);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: this.isSelected('open', nextProps),
            selected: this.isSelected('selected', nextProps)
        });
    }

    // render Icon
    renderIcon() {
        let { data } = this.props,
            icon = data.icon;
        if (!icon) {
            return null;
        } else {
            if (typeof icon === 'string') {
                return <i className={icon} />;
            } else {
                return icon;
            }
        }
    }
    renderSubIcon() {
        let { data, opened } = this.props,
            { open } = this.state,
            iStyle = {
                transform: open || opened ? 'rotate(90deg)' : ''
            }

        if (!data.children) {
            return null;
        } else {
            return <i className="glyphicon glyphicon-chevron-right has-child-icon" style={iStyle}/>;
        }
    }

    // render 子Ul
    renderSubList() {
        let { data, selected, active, selectKey, opened } = this.props,
            { open } = this.state;

        if (open && active.length > 0) {
            active.pop();
        }

        return data.children && <List
                                    data={data.children}
                                    open={open}
                                    opened={opened}
                                    selected={selected}
                                    active={active}
                                    selectKey={selectKey}
                                    onClick={this.handleListClick}
                                />;
    };

    render() {
        let { data } = this.props,
            { selected } = this.state,
            classNames = setClass({
                'selected' : selected,
                'hidden': data.hidden,
                [data.className ? data.className : ''] : true
            });

        return (
            <li className={classNames} >
                <a href={data.href} onClick={this.handleClick} target={`${data.target ?   data.target : '_self'}`}>
                    { this.renderIcon() }
                    <span>{data.name}</span>
                    { this.renderSubIcon() }
                </a>
                { this.renderSubList() }
            </li>
        );
    }
}
