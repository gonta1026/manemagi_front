import React, { useState } from 'react';
import axios from 'axios';

const ApiConnect = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleClickEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleClickPass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
  };
  const handleClickConfirmPass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPass(e.target.value);
  };
  const onClick = () => {
    const API_URL = 'https://manemagi-api-1026.herokuapp.com/api/auth';

    axios
      .post(API_URL, {
        email: email,
        password: pass,
        password_confirmation: confirmPass,
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div>
      <p className="text-xl">API接続テスト</p>
      <div>
        <p>email</p>
        <input className="border" type="text" value={email} onChange={handleClickEmail} />
        <p>{email}</p>
      </div>
      <div>
        <p>パスワード</p>
        <input className="border" type="text" value={pass} onChange={handleClickPass} />
        <p>{pass}</p>
      </div>
      <div>
        <p>パスワード（確認）</p>
        <input
          className="border"
          type="text"
          value={confirmPass}
          onChange={handleClickConfirmPass}
        />
        <p>{confirmPass}</p>
      </div>
      <button className="mt-5 px-4 py-3 bg-blue-200" onClick={onClick}>
        送信
      </button>
    </div>
  );
};

export default ApiConnect;
