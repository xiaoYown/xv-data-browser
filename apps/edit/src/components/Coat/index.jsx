import React from 'react';
import Column from '../../core/chart/column';

class Coat extends React.Component {
  componentDidMount () {
    const { data } = this.props;
    this.chart = new Column('c1', data);
    this.chart.render();
  }
  shouldComponentUpdate () {
    // TODO: 此处做 chart 视图更新
    return false
  }
  componentWillUnmount () {
    this.chart.destroy();
  }
  render () {
    return (
      <div className="wrapper">
        <div className="cell">
          <div
            className="inner"
            style={{
              width: `${600}px`,
              height: `${400}px`,
            }}
          >
            <div
              id="c1"
              className="m-ChartWrapper"
            ></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Coat;
