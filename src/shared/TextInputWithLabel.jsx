import React from 'react';

const TextInputWithLabel = ({ elementId, labelText, onChange, ref, value }) => {
  return (
    <>
      <label htmlFor={elementId}>{labelText}</label>
      <input
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
        data-testid="todoTitle"
      />
    </>
  );
};

export default TextInputWithLabel;
