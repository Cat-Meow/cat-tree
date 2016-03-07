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
        prefixName: React.PropTypes.string
    }

    static defaultProps = {
        selected: '',   // 选中的, 这里默认的key是href
        dynamic: true,     // 是否接受外界新数据, 如果设置false，组件将默认全部展开，且点击不折叠
        open: true,     // 根组件默认展开
        selectKey: 'name',  // 匹配默认的key值
        opened: false,
        prefixName: 'rs'   // 前缀名
    }

    state = {
        active: this._getActive(this.props),
        selected: this._getActive(this.props)
    }

    filterData(data, selected) {
        let result = [];
        let length = data.length;
        let self = this;

        for (var i = 0; i < length; i ++) {
            let item = data[i];
            if (item.href === selected) {
                result = [item];
                break;
            } else if(item.children){
                result = self.filterData(item.children, selected );
                if (result.length > 0) {
                    result.push(item);
                    break;
                }
            }
        }
        return result;
    }

    _getActive(props) {
        let { data, selected } = props;
        if (!Array.isArray(data)) {
            data = [data];
        }

        return this.filterData(data, selected);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dynamic) {
            let active = this._getActive(nextProps);

            this.setState({
                active: active,
                selected: active
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.data !== this.props.data || this.props.dynamic;
    }

    _handleClick(active) {
        this.setState({
            active: active
        });
        if (this.props.onClick) {
            this.props.onClick(active);
        }
    }

    render() {
        let { prefixName, data } = this.props,
            { active, selected } = this.state,
            Component = Array.isArray(data) ? List : Item;

        return (
            <div className={`${prefixName}-tree`}>
                <Component
                    {...this.props}
                    active={active}
                    selected={selected}
                    onClick={this::this._handleClick}
                />
            </div>      
        );
    }
}
