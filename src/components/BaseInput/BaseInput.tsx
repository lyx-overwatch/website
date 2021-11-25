import React, { useImperativeHandle, useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Picker } from 'emoji-mart';
import Icon from '../Basic/Icon';
import { useControllableValue } from 'ahooks';
import pc from "prefix-classnames";
import './BaseInput.less';
import 'emoji-mart/css/emoji-mart.css';

const prefix = 'lyx-base-input';
const px = pc(prefix);

interface BaseInputProps {
  value?: string; // input受控的value值
  onChange: (v: string) => void; // input受控的onChange事件
  onConfirm: () => void; // 手机键盘enter按下触发的事件
  onBlur?: () => void; // 失去焦点触发的事件
  onFocus?: () => void; // 获得焦点触发的事件
}

const BaseInput = React.forwardRef((props: BaseInputProps, pRef) => {
  const { onConfirm, onChange, onFocus, onBlur, ...rest } = props;
  const ref = useRef<HTMLInputElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const [bottom, setBottom] = useState(0);
  const [preHeight, setHeight] = useState(0);
  const [val, setVal] = useControllableValue<string>(props);
  const [emojiShow, setShow] = useState<boolean>(false);

  useImperativeHandle(pRef, () => ({
    focus: () => {
      ref.current?.focus();
    },
    blur: () => {
      ref.current?.blur();
    },
  }));

  useEffect(() => {
    const handleDom = (e: any) => {
      // 点击输入框，表情包区域外时
      if (!root.current?.contains(e.target)) {
        setBottom(0); // 此时已经失去焦点，软键盘收起，input框位置复原
        if (onBlur) onBlur();
        setShow(false);
        setVal('');
      }
    };
    const handleTouch = (e: any) => {
      if (!root.current?.contains(e.target)) {
        if (onBlur) onBlur();
        ref.current?.blur();
      }
    };
    document.addEventListener('pointerdown', handleDom, false);
    document.addEventListener('touchmove', handleTouch, false);

    const emojiImg = document.getElementById('emojiImg');
    if (emojiImg) {
      // 阻止点击表情包图片时input框失焦
      emojiImg.onpointerdown = (e) => {
        e.preventDefault();
      };
    }

    const picker: HTMLCollectionOf<SelfElement> = document.getElementsByClassName('emoji-mart');
    if (picker.length) {
      // 阻止点击表情包时input框失焦
      picker[0].onpointerdown = (e: any) => {
        e.preventDefault();
      };
    }

    setHeight(window.innerHeight); // 获取容器初始高度

    return () => {
      document.removeEventListener('pointerdown', handleDom, false);
      document.removeEventListener('touchmove', handleTouch, false);
    };
  }, []);

  const emojiClick = (emoji: any) => {
    const { native } = emoji;
    if (val) {
      setVal(val + native);
    } else {
      setVal(native);
    }
  };

  return ReactDOM.createPortal(
    <div className={px('root')} ref={root} style={{ bottom: `${bottom}px` }}>
      <div className={px('header')}>
        <input
          value={val}
          ref={ref}
          {...rest}
          onFocus={() => {
            const u = navigator.userAgent;
            const isIOS = !!/\(i[^;]+;( U;)? CPU.+Mac OS X/.exec(u);
            if (isIOS) {
              setTimeout(() => {
                const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                window.scrollTo(0, -scrollTop);
                // 苹果系统的input框聚焦页面会发生滚动, window.innerheight会发生变化，根据高度变化动态的设置input框的位置
                const dis = preHeight - window.innerHeight;
                setBottom(-dis);
              }, 500);
            }
            if (onFocus) onFocus();
          }}
          onBlur={(e) => {
            setBottom(0);
            if (!root.current?.contains(e.target)) {
              // 原生事件接管失焦触发的事件
              if (onBlur) onBlur();
              setShow(false);
              setVal('');
              window.scroll(0, 0);
            } else {
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            e.persist();
            const { target } = e;
            const { value } = target;
            onChange(value);
          }}
          onKeyPress={(e) => {
            e.persist();
            const { key } = e;
            if (key === 'Enter') {
              const timer = window.requestAnimationFrame(() => {
                setShow(false);
                onConfirm();
                ref.current?.blur();
                window.cancelAnimationFrame(timer);
              });
            }
          }}
        />
        <div
          id="emojiImg"
          onClick={() => {
            setShow(!emojiShow);
          }}
        >
          <Icon name="icon-400biaoqing_biaoqing"></Icon>
        </div>
      </div>
      <div style={{ display: emojiShow ? '' : 'none' }}>
        <Picker
          set="apple"
          showPreview={false}
          style={{
            position: 'fixed',
            top: `${-319}px`,
            width: '100%',
            height: '319px',
            left: '0px',
          }}
          onClick={emojiClick}
          sheetSize={16}
          native
          i18n={{
            categories: {
              recent: '最常使用',
              smileys: '笑脸和表情',
              people: '人和身体',
              nature: '动物和自然',
              foods: '食物和饮品',
              activity: '活动',
              places: '旅行和地点',
              objects: '常用物品',
              symbols: '标志',
              flags: '旗帜',
            },
          }}
        />
      </div>
    </div>, document.body)
});

export default BaseInput;
