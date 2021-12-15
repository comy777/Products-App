import {useState} from 'react';

const useForm = <T extends Object>(initialState: T) => {
  const [state, setstate] = useState(initialState);
  const onChange = (value: string, field: keyof T) => {
    setstate({
      ...state,
      [field]: value,
    });
  };
  const setFormValue = (form: T) => {
    setstate(form);
  };
  const reset = () => setstate(initialState);
  return {
    form: state,
    onChange,
    setFormValue,
    reset,
  };
};

export default useForm;
