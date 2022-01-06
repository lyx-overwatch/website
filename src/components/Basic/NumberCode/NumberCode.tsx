import React, { useEffect, useState } from "react";
import _ from "lodash";
import { initDigitsState } from "./constant";
import type { digitType } from "./constant";
import styles from "./NumberCode.module.scss";

export interface ICodeProps {
  onChange: (value: string) => any;
}

const NumberCode = (props: ICodeProps) => {
  const { onChange = () => undefined } = props;
  const [inputId, setId] = useState("id");
  const [inputValue, setValue] = useState("");
  const [digits, setDigits] = useState<digitType[]>(initDigitsState);
  const [currentIndex, setIndex] = useState(0);

  useEffect(() => {
    const newId = new Date().getTime().toString();
    setId(newId);
  }, []);

  useEffect(() => {
    const getResult = (digits: digitType[]) => {
      let result = "";
      if (digits.length === 0) return result;
      for (let i = 0; i < digits.length; i++) {
        const { value } = digits[i];
        if (!value || value === "|") break;
        result += value;
      }
      setValue(result);
      return result;
    };
    const result = getResult(digits);
    setValue(result);
  }, [digits]);

  useEffect(() => {
    onChange(inputValue);
  }, [inputValue, onChange]);

  const handleFocus = () => {
    if (currentIndex >= digits.length) return;
    const currentDigit = {
      focus: true,
      value: "|",
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
      value: "",
    };
    const newArray: digitType[] = [];
    const currentDigits: digitType[] = newArray.concat(digits);
    currentDigits[currentIndex] = currentDigit;
    setDigits(currentDigits);
  };

  const handleChange = _.throttle((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // 在一加手机的搜狗输入法下，切换输入方式，点击删除键的时候e.key有时候会等于Unidentified,导致无法触发handlePre方法，并且造成e.target.value改变；这里需要加一个判断避免造成bug
    if (value.length < currentIndex) return;
    // 通过复制验证码输入的情况
    if (value.length === digits.length && currentIndex === 0) {
      handleCopyToValue(value);
      return;
    }
    if (currentIndex < digits.length) {
      const current = value.slice(value.length - 1, value.length);
      if (!/^\d+$/.test(current)) return;
      handleNext(currentIndex, current);
    }
  }, 100);

  // 通过粘贴板的方式填入数字
  const handleCopyToValue = (values: string) => {
    if (!digits.length) return;
    const newArray: digitType[] = [];
    const currentDigits: digitType[] = newArray.concat(initDigitsState);
    for (let i = 0; i < values.length; i++) {
      currentDigits[i].value = values[i];
      currentDigits[i].focus = true;
    }
    setDigits(currentDigits);
    setIndex(digits.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Unidentified") {
      return;
    }
    if (e.key === "Backspace") {
      e.preventDefault();
      handlePre(currentIndex);
    }
  };

  const handleNext = (index: number, value: string) => {
    const currentDigit = {
      focus: true,
      value,
    };
    const nextDigit = {
      focus: true,
      value: "|",
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
    if (index === 0) return;
    const currentDigit = {
      focus: false,
      value: "",
    };
    const preDigit = {
      focus: true,
      value: "|",
    };
    const newArray: digitType[] = [];
    const currentDigits: digitType[] = newArray.concat(digits);

    if (index < digits.length) {
      currentDigits[index] = currentDigit;
      if (index >= 1) {
        currentDigits[index - 1] = preDigit;
      }
    } else {
      currentDigits[index - 1] = preDigit;
    }
    setDigits(currentDigits);
    const preIndex = index - 1 > 0 ? index - 1 : 0;
    setIndex(preIndex);
  };

  return (
    <div className={styles.Root}>
      <label htmlFor={inputId} className={styles.DigitWrapper}>
        {digits.map(({ focus, value }, index) => {
          return (
            <div
              key={index}
              className={`${styles.Item} ${focus ? styles.Focus : ""}  
                  ${value && value !== "|" ? styles.NumberText : ""}
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
