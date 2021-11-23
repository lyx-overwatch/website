import React, { useRef, useState, useContext } from "react";
import Icon from '@/components/Basic/Icon';
import BaseInput from "@/components/BaseInput";
import { Context } from '@/components/BaseLayout/context';
import AirMessage from '@/components/Basic/AirMessage';
import './BuuletChat.scss';

const BuuletChat = () => {
  const { changeMenuShow, showMenus } = useContext(Context);
  const [val, setVal] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputShow, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [msgShow, setMsgShow] = useState(false);

  const handleFocus = () => {
    window.requestAnimationFrame(() => {
      changeMenuShow(false);
      setShow(true);
      inputRef.current?.focus();
    });
  }

  const handleConfirm = () => {
    setMessage(val);
    window.requestAnimationFrame(() => {
      setMsgShow(true);
      setShow(false);
      changeMenuShow(true);
      setVal('');
    });
  };

  return (
    <div className="buulet-chat" style={{ visibility: showMenus ? 'visible' : 'hidden' }}>
      <Icon name="icon-shuru" onClick={() => handleFocus()}></Icon>
      {
        inputShow &&
        <BaseInput
          ref={inputRef}
          value={val}
          onChange={(v) => {
            setVal(v);
          }}
          onConfirm={handleConfirm}
          onBlur={() => {
            changeMenuShow(true);
            setShow(false);
          }} />
      }
      {
        msgShow &&
        <AirMessage value={message} closeMessage={() => setMsgShow(false)}></AirMessage>
      }
    </div>
  )
};

export default BuuletChat;