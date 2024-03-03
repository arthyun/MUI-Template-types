'use client';
import React, { SetStateAction } from 'react';

const ResultPageView = ({ limit, setLimit }: { limit: number; setLimit: React.Dispatch<SetStateAction<number>> }) => {
   return (
      <div className="limitArea mb-2">
         <select
            value={limit}
            onChange={(e) => {
               setLimit(Number(e.target.value));
            }}
         >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
         </select>
         <span>개씩 보기</span>
      </div>
   );
};

export default ResultPageView;
