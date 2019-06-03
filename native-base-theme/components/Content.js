// @flow

import variable from "./../variables/platform";

export default (variables /*: * */ = variable) => {
  const contentTheme = {
    flex: 1,
    backgroundColor: variable.brandBackground,
    "NativeBase.Segment": {
      borderWidth: 0,
      backgroundColor: variable.brandBackground
    }
  };

  return contentTheme;
};
