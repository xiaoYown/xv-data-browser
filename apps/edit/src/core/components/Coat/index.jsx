import React, { useEffect } from 'react';
import { Column } from '../../chart';

const chartData = {
  "dataIndex": [
    "x",
    "y"
  ],
  "data": [
    {
      "x": "家具家电",
      "y": 340
    },
    {
      "x": "粮油副食",
      "y": 822
    },
    {
      "x": "美容洗护",
      "y": 888
    },
    {
      "x": "母婴用品",
      "y": 821
    },
    {
      "x": "进口食品",
      "y": 671
    },
    {
      "x": "食品饮料",
      "y": 696
    },
    {
      "x": "家庭清洁",
      "y": 306
    }
  ],
  "configs": {
    "title": "示例",
    "size": {
      "w": 600,
      "h": 400
    },
    "xField": "x",
    "yField": "y",
    "color": [
      {
        "hex": "#2194ff",
        "a": 0.8
      }
    ]
  }
};

class Coat extends React.Component {
  componentDidMount () {
    this.chart = new Column('c1', chartData);
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
