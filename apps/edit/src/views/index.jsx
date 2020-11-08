import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import { initData } from '../store/main/actions';

initData();

const Render = ({ status, portion }) => {
  let reactNode = null;
  if (status === 1) {
    reactNode = <Layout portion={ portion } />
  } else if (status === 2) {
    reactNode = <div>loading</div>
  }
  return reactNode;
}

function Index (props) {
  useEffect(() => {
    return () => {
      console.log('view destroy');
    }
  });
  const { status } = props.main;
  const { using } = props.portion;
  return <Render
    status={ status }
    portion={ using }
  />
}

const mapStateToProps = ({ main, portion }) => {
  return {
    main,
    portion
  }
}
export default connect(
  mapStateToProps
)(Index);
