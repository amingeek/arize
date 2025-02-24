/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import React, { useState } from 'react';

const containerStyle = css`
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
`;

const statusContainerStyle = css`
  margin: 20px 0;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const usageContainerStyle = css`
  margin: 20px 0;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const usageBarStyle = css`
  height: 10px;
  background-color: #3498db;
  border-radius: 5px;
  margin-top: 5px;
`;

const usageFillStyle = (width: string) => css`
  height: 100%;
  border-radius: 5px;
  background-color: #e74c3c;
  width: ${width};
`;

function ServerRoomMonitoring() {
  const [serverStatus, setServerStatus] = useState<string>('Running');
  const [cpuUsage, setCpuUsage] = useState<number>(80);
  const [memoryUsage, setMemoryUsage] = useState<number>(60);
  const [storageUsage, setStorageUsage] = useState<number>(70);

  return (
    <div css={containerStyle}>
      <h1>مانیتورینگ اتاق سرور</h1>
      <div css={statusContainerStyle}>
        <h2>وضعیت سرور: {serverStatus}</h2>
      </div>
      <div css={usageContainerStyle}>
        <h2>مصرف CPU: {cpuUsage}%</h2>
        <div css={usageBarStyle}>
          <div css={usageFillStyle(`${cpuUsage}%`)}></div>
        </div>
      </div>
      <div css={usageContainerStyle}>
        <h2>مصرف حافظه: {memoryUsage}%</h2>
        <div css={usageBarStyle}>
          <div css={usageFillStyle(`${memoryUsage}%`)}></div>
        </div>
      </div>
      <div css={usageContainerStyle}>
        <h2>مصرف فضای ذخیره‌سازی: {storageUsage}%</h2>
        <div css={usageBarStyle}>
          <div css={usageFillStyle(`${storageUsage}%`)}></div>
        </div>
      </div>
    </div>
  );
}

export default ServerRoomMonitoring;
