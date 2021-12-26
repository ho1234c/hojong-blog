import isEmpty from 'lodash-es/isEmpty';
import { useState, useEffect } from 'react';
import { Theme } from '@emotion/react';

import { theme as _theme, ColorType } from '@src/theme';

export const useSettledTheme = () => {
  const [theme, setTheme] = useState<{ color: ColorType; isDarkMode: boolean }>(() => ({} as Theme));

  useEffect(() => {
    const isDarkMode = localStorage.getItem('isDarkMode') === '1';

    setTheme({
      color: isDarkMode ? _theme.color.dark : _theme.color.light,
      isDarkMode,
    });
  }, []);

  return {
    theme,
    setTheme,
    isSettled: !isEmpty(theme),
  };
};
