import React from 'react';
import { CoursePart } from '../App';

interface PartProps {
  part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const assertPart = (part: CoursePart) => {
  switch (part.type) {
    case 'normal':
      return <p>Description: {part.description}</p>;
    case 'groupProject':
      return <p>Group Project: {part.groupProjectCount}</p>;
    case 'submission':
      return (
        <>
          <p>Description: {part.description}</p>
          <p>Submission Link: {part.exerciseSubmissionLink}</p>
        </>
      );
    case 'special':
      return (
        <>
          <p>Description: {part.description}</p>
          <p>Required Skills: {part.requirements}</p>
        </>
      );

    default:
      return assertNever(part);
  }
};

const Part = (props: PartProps) => {
  return (
    <div>
      <p>
        <strong>
          {props.part.name} {props.part.exerciseCount}
        </strong>
      </p>
      {assertPart(props.part)}
    </div>
  );
};

export default Part;
