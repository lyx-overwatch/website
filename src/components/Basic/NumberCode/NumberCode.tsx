import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { initDigitsState } from './constant';
import type { digitType } from './constant';
import styles from './NumberCode.module.scss';

export interface ICodeProps {
  onChange: (value: string) => any;
}

const NumberCode = (props: ICodeProps) => {
  const {
    onChange = () => undefined,
  } = props;
  const [inputId, setId] = useState('id');
  const [inputValue, setValue] = useState('');
  const [digits, setDigits] = useState<digitType[]>(initDigitsState);
  const [currentIndex, setIndex] = useState(0);

  useEffect(() => {
    const newId = new Date().getTime().toString();
    setId(newId);
  }, []);

  useEffect(() => {
    const getResult = (digits: digitType[]) => {
      let result = '';
      if (digits.length === 0) return result;
      for (let i = 0; i < digits.length; i++) {
        const { value } = digits[i];
        if (!value || value === '|') break;
        result += value;
      }
      setValue(result);
      return result;
    };
    const result = getResult(digits);
    onChange(result);
  }, [digits]);

  const handleFocus = () => {
    if (currentIndex >= digits.length) return;
    const currentDigit = {
      focus: true,
      value: '|',
    };
    const newArray: digitType[] = [];
    const currentDigits: digitType[] = newArray.concat(digits);
    currentDigits[currentIndex] = currentDigit;
    setDigits(currentDigits);
  };

  const handleBlur = () => {
    if (currentIndex >= digits.length) return;
    const currentDigit = {
      focus: true,
      value: '',
    };
    const newArray: digitType[] = [];
    const currentDigits: digitType[] = newArray.concat(digits);
    currentDigits[currentIndex] = currentDigit;
    setDigits(currentDigits);
  };

  const handleChange = _.throttle((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (currentIndex < digits.length) {
      const current = value.slice(value.length - 1, value.length);
      handleNext(currentIndex, current);
    }
  }, 100);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      handlePre(currentIndex);
    }

    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'Home') {
      e.preventDefault();
    }
  };

  const handleNext = (index: number, value: string) => {
    if (!/^\d+$/.test(value)) return;
    const currentDigit = {
      focus: true,
      value,
    };
    const nextDigit = {
      focus: true,
      value: '|',
    };
    const newArray: digitType[] = [];
    const currentDigits: digitType[] = newArray.concat(digits);
    currentDigits[index] = currentDigit;
    if (index <= digits.length - 2) {
      currentDigits[index + 1] = nextDigit;
    }
    setDigits(currentDigits);
    if (index >= digits.length) {
      setIndex(digits.length);
    } else {
      setIndex(index + 1);
    }
  };

  const handlePre = (index: number) => {
    const currentDigit = {
      focus: false,
      value: '',
    };
    const preDigit = {
      focus: true,
      value: '|',
    };
    const newArray: digitType[] = [];
    const currentDigits: digitType[] = newArray.concat(digits);

    if (index < digits.length) {
      currentDigits[index] = index > 0 ? currentDigit : preDigit;
      if (index >= 1) {
        currentDigits[index - 1] = preDigit;
      }
      setDigits(currentDigits);
    } else {
      currentDigits[index - 1] = preDigit;
      setDigits(currentDigits);
    }
    setIndex(index - 1 > 0 ? index - 1 : 0);
  };

  return (
    <div className={styles.Root}>
      <label htmlFor={inputId} className={styles.DigitWrapper}>
        {digits.map(({ focus, value }, index) => {
          return (
            <div
              key={index}
              className={`${styles.Item} ${focus ? styles.Focus : ''}  
                  ${value && value !== '|' ? styles.NumberText : ''}
                  `}
            >
              {value}
            </div>
          );
        })}
      </label>
      <input
        id={inputId}
        className={styles.Input}
        value={inputValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      ></input>
    </div>
  );
};

export default NumberCode;
