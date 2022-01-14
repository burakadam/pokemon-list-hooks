type Props = {
  type: string;
  value: number | string;
  onChange: (e: any) => void;
};

const Input: React.FC<Props> = ({ type, value, onChange }) => {
  console.log(type);
  return <input type={type} value={value} onChange={onChange}></input>;
};

export default Input;
