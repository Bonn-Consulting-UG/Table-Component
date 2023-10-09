import React from "react";

export const DetailsRow: React.FC<any> = ({
  rowData,
  detailrowoptions
}) => (
    <div>
      <h3>{detailrowoptions?.header}</h3>
      {rowData[detailrowoptions?.columnKey]?.map((data: any) => 
        <p style={{display: 'flex', alignItems: 'center', gap: '1em', marginLeft: '2em'}}>
          {data.link ? <a href={data.link}  target="_blank" rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="rgb(75, 75, 75)" height="20" viewBox="0 -960 960 960" width="20">
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
            </svg>
          </a> : null}
          {detailrowoptions?.dataKeys?.map((key: string) => 
            <span> {data[key]} </span>
          )}
        </p>
      )}
    </div>
  );