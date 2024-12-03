import React, { createContext, useEffect, useState } from 'react';

export const RsContextCreater = createContext();

const ContextMain = ({children}) => {

  const [detailsCon, setDetailsCon] = useState(() => {
    const saved = sessionStorage.getItem('detailsCon');
    return saved ? JSON.parse(saved) : {
       inputMoboleNo: '' ,
       mobileno:'',
       loginMobNoCon:'',
       i:''
      };
  });

  useEffect(() => {
    sessionStorage.setItem('detailsCon', JSON.stringify(detailsCon));
  }, [detailsCon]);

  return (
    <div>
        <RsContextCreater.Provider value={{detailsCon , setDetailsCon}}>
            {children}
        </RsContextCreater.Provider>
    </div>
  )
}

export default ContextMain;