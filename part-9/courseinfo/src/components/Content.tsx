import React from 'react';
import { CoursePart } from '../App';
import Part from './Part';

interface ContentProps {
  courses: Array<CoursePart>;
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courses.map((c) => (
        <Part key={c.name} part={c} />
      ))}
    </div>
  );
};

export default Content;
