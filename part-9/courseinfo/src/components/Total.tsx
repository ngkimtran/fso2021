import React from 'react';

interface TotalProps {
  total: number;
}

const Total = (props: TotalProps) => {
  return <h3>Number of exercises: {props.total}</h3>;
};

export default Total;
