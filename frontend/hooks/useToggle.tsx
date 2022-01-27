import { useState } from 'react';

const useToggle = (initActive = false) => {
  const [value, setValue] = useState(initActive);
  const toggle = () => setValue(!value);

  return { value, toggle };
};

export default useToggle;
