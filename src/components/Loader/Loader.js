import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './Loader.module.css';

const Loader = () => {
  return (
    <div className={s.loader}>
      <ThreeDots color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default Loader;
