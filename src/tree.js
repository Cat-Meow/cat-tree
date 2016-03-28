import React, { Component } from 'react';
import List from './list';
import Item from './item';

export default class Tree extends Component {
    static propTypes = {
        selected: React.PropTypes.string,
        dynamic: React.PropTypes.bool,
        open: React.PropTypes.bool,
        selectKey: React.PropTypes.string,
        opened: React.PropTypes.bool,
        prefixName: React.PropTypes.string,
        className: React.PropTypes.string
    }

    static defaultProps = {
        selected: '',   // 选中的, 这里默认的key是href
        dynamic: true,     // 是否接受外界新数据
        open: true,     // 根组件默认展开
        selectKey: 'href',  // 匹配默认的key值
        opened: false,  // 如果设置true，组件将默认全部展开，且点击不折叠
        prefixName: 'salt',   // 前缀名
        className: ''
    }

    constructor(props) {
        super(props);
        let initer = this.getActive(this.props);
        this.state = {
            active: initer,
            selected: initer
        };

        this.handleClick = this.handleClick.bind(this);
    }

    filterData(data, selected) {
        let result = [];
        let length = data.length;
        let key = this.props.selectKey;

        for (var i = 0; i < length; i ++) {
            let item = data[i];
            if (item[key] === selected) {
                result = [item];
                break;
            } else if (item.children) {
                result = this.filterData(item.children, selected );
                if (result.length > 0) {
                    result.push(item);
                    break;
                }
            }
        }
        return result;
    }

    getActive(props) {
        let { data, selected } = props;
        if (!Array.isArray(data)) {
            data = [data];
        }

        return this.filterData(data, selected);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dynamic) {
            let active = this.getActive(nextProps);

            this.setState({
                active: active,
                selected: active
            });
        }
    }

    // dynamic设置为false的情况下，组件不接受外界更新
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.dynamic;
    }

    // 告知外界目前正在选择的对象
    handleClick(active) {
        this.setState({
            active: active
        });
        if (this.props.onClick) {
            this.props.onClick(active);
        }
    }

    render() {
        let { prefixName, data, className } = this.props;
        let { active, selected } = this.state;
        let Component = Array.isArray(data) ? List : Item;

        return (
            <div className={`${prefixName}-tree ${className}`}>
                <Component
                    {...this.props}
                    active={active}
                    selected={selected}
                    onClick={this.handleClick}
                />
            </div>      
        );
    }
}
