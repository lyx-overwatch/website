// import cssVars from 'css-vars-ponyfill';
import purple from './purple-theme';
import blue from './blue-theme';
import gray from './gray-theme';

const changeColors = (mode: string) => {

  let themeColor = null;
  if (mode === 'purple') themeColor = { ...purple };
  if (mode === 'gray') themeColor = { ...gray };
  if (mode === 'blue') themeColor = { ...blue };

  if (themeColor) {
    for (const [key, value] of Object.entries(themeColor)) {
      document.body.style.setProperty(key, value);
    }
  }

  return themeColor;
};

export default changeColors;
