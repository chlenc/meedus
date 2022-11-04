import styled from "@emotion/styled";
import React, { ChangeEvent, useState } from "react";
import Text from "@components/Text";
import { ReactComponent as SearchIcon } from "@src/assets/icons/search.svg";

interface IProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "onChange" | "prefix"
  > {
  icon?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  suffix?: string;
  prefix?: string;
  suffixCondition?: boolean;
  error?: boolean;
  errorText?: string;
  description?: string;
}

const Root = styled.div<{
  focused?: boolean;
  error?: boolean;
  readOnly?: boolean;
}>`
  width: 100%;

  padding: 16px;
  gap: 8px;

  height: 56px;
  border-radius: 8px;

  background: ${({ readOnly }) => (readOnly ? "#EEEEEE" : "#ffffff")};
  border: 2px solid ${({ readOnly }) => (readOnly ? "#AAAAAA" : "#000")};
  background: ${({ focused }) => (focused ? "#fffff" : "#fffff")};
  transition: 0.4s;
  :hover {
    //border: 2px solid #269995;
    border-color: ${({ focused, error, readOnly }) =>
      error
        ? "#ED827E"
        : readOnly
        ? "#AAAAAA"
        : !focused
        ? "#000000"
        : "#269995"};
  }
  align-items: center;
  justify-content: space-between;
  display: flex;
  font-size: 16px;
  line-height: 24px;
  box-sizing: border-box;

  input {
    padding: 0;
    width: 100%;
    outline: none;
    border: none;
    background-color: transparent;
    color: ${({ readOnly }) => (readOnly ? "#AAAAAA" : "#000")};
    ::placeholder {
    }
  }
  div {
    color: ${({ readOnly }) => (readOnly ? "#AAAAAA" : "#000")};
  }
`;

const Input: React.FC<IProps> = ({
  value,
  onChange,
  prefix,
  suffix,
  suffixCondition,
  placeholder,
  error,
  errorText,
  description,
  icon,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <>
      <Root focused={focused} error={error} {...rest}>
        {icon === "search" && <SearchIcon style={{ marginRight: 16 }} />}
        {prefix && prefix}
        <input
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {suffix != null && <Text fitContent>{suffix}</Text>}
      </Root>
      {error ? (
        <Text size="small" type="error" style={{ paddingTop: 4 }}>
          {errorText}
        </Text>
      ) : (
        description && (
          <Text size="small" type="secondary" style={{ paddingTop: 4 }}>
            {description}
          </Text>
        )
      )}
    </>
  );
};
export default Input;
