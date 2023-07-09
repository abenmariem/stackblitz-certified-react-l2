import * as React from 'react';

export interface AnswerButtonProps {
  value: string;
  className: string;
  index: number;
  handleClick(evt, value): void;
  disabledNonSelectedAnswers: boolean;
}

export const AnswerButton = ({
  value,
  className,
  handleClick,
  disabledNonSelectedAnswers,
}: AnswerButtonProps) => {
  const handleSubmit = (evt, value) => {
    evt.preventDefault();
    handleClick(evt, value);
  };

  // const [disabled, setDisabled] = React.useState(false);

  return (
    <button
      type="button"
      onClick={(evt) => handleSubmit(evt, value)}
      className={className}
      disabled={disabledNonSelectedAnswers}
    >
      {value}
    </button>
  );
};
