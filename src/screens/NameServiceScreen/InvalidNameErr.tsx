import React from "react";

interface IProps {}

const InvalidNameErr: React.FC<IProps> = () => {
  return (
    <>
      <b>Make sure that the entered domain meets the following conditions:</b>
      <ul>
        <li>- Only small letters, numbers and "-" are available</li>
        <li>- Length from 1 to 53 characters</li>
        <li>- First and last character cannot be "-"</li>
        <li>- 3rd and 4th character cannot be a hyphen in a row</li>
      </ul>
    </>
  );
};
export default InvalidNameErr;
