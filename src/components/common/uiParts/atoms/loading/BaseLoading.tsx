import React from 'react';
import styled from 'styled-components';

const Loading = (): JSX.Element => <Loader>Loading...</Loader>;

const Loader = styled.div`
  font-size: 10px;
  text-indent: -9999em;
  width: 5em;
  height: 5em;
  border-radius: 50%;
  background: #48c6ef;
  background: -moz-linear-gradient(left, #48c6ef 10%, rgba(128, 246, 255, 0) 42%);
  background: -webkit-linear-gradient(left, #48c6ef 10%, rgba(128, 246, 255, 0) 42%);
  background: -o-linear-gradient(left, #48c6ef 10%, rgba(128, 246, 255, 0) 42%);
  background: -ms-linear-gradient(left, #48c6ef 10%, rgba(128, 246, 255, 0) 42%);
  background: linear-gradient(to right, #48c6ef 10%, rgba(128, 246, 255, 0) 42%);
  -webkit-animation: load3 1.4s infinite linear;
  animation: load3 1.4s infinite linear;
  // 位置の調整
  position: absolute;
  top: 30%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 100;
  &::before {
    width: 50%;
    height: 50%;
    background: #48c6ef;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
  }

  &::after {
    background: #fff;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  @-webkit-keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

export default Loading;
