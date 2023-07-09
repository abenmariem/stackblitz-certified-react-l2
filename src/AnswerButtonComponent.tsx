import * as React from 'react';

export interface AnswerButtonProps {
  value: string;
  className: string;
  index: number;
  handleClick(evt, index: number): void;
  disabledNonSelectedAnswers: boolean;
}

export const AnswerButton = ({
  value,
  className,
  index,
  handleClick,
  disabledNonSelectedAnswers,
}: AnswerButtonProps) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleClick(evt, index);
  };

  // const [disabled, setDisabled] = React.useState(false);

  return (
    <button
      type="button"
      onClick={handleSubmit}
      className={className}
      disabled={disabledNonSelectedAnswers}
    >
      {value}
    </button>
  );
};
