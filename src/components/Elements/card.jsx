export const Card = (props) => {
  const {varian, children,type, onClick = () => {}} = props
  return (
    <div 
      className={`mt-3 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-300 ${varian}`}
      type={type}
      onClick={onClick}
      >
    {children}
  </div>
);
}