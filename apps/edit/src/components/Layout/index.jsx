import React from 'react';
import Coat from '../Coat';

const Layout = ({ portion }) => {
  let node = null;
  if (portion) {
    const { content, materials } = portion;
    const { layout } = content.props;
    node = <div
      style={{
        padding: 40,
        width: layout.width,
        height: layout.height,
      }}>
      <div
        style={layout}
      >
        {
          materials.map(item => {
            return <Coat
              key={ item.id }
              data={ item }
            />
          })
        }
      </div>
    </div>
  }
  return node;
}

export default Layout;
