import React, { useContext } from 'react';
import styled from 'styled-components';
import { ExampleContext } from './AppContext';

const Header = styled.h1`
  font-family: italic;
`;

const GreenHeader = styled(Header)`
  color: green;
`;

const LightBlueHeader = styled(Header)`
  color: #add8e6;
`;

function Title() {
  const { title, setTitle } = useContext(ExampleContext);

  return (
    <div onClick={() => setTitle('I accidentally clicked title')}>
      <Header>{title}</Header>
    </div>
  );
}

export function GreenTitle({ title }) {
  return <GreenHeader>{title}</GreenHeader>;
}

export function LightBlueTitle({ title }) {
  return <LightBlueHeader>{title}</LightBlueHeader>;
}

export default Title;
