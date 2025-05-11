import { Link } from "react-router-dom";

export const Button = (props) => {
    const {varian, children,type, onClick = () => {}} = props
    return (
      <button 
        className={`h-10 px-6 font-semibold rounded-md ${varian} text-white`} 
        type={type}
        onClick={onClick}
        >
      {children}
    </button>
  );
}

export const ButtonTheme = (props) => {
  const {url, children, varian,onClick} = props
  return (
    <Link 
      onClick={onClick}
      className={`block text-center w-full py-2 rounded-theme transition ${varian}`} 
      to={url}
      >
    {children}
    </Link>
  );
}

export const ButtonMd = (props) => {
  const {url, children, varian} = props
  return (
    <Link 
      className={`bg-green-500 mt-4 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition cursor-pointer ${varian}`} 
      to={url}
      >
    {children}
    </Link>
  );
}

export const ButtonSubmitTheme = (props) => {
  const {type, children, varian, onClick} = props
  return (
    <button 
      className={`block text-center w-full py-2 rounded-theme transition ${varian} cursor-pointer`} 
      type={type}
      onClick={onClick}
      >
    {children}
    </button>
  );
}

export const ButtonSubmitMDTheme = (props) => {
  const {type, children, varian, onClick} = props
  return (
    <button 
      className={`block md:inline-block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition cursor-pointer ${varian}`} 
      type={type}
      onClick={onClick}
      >
    {children}
    </button>
  );
}

export const ButtonPrimarySubmit = (props) => {
  const {type, children, varian, onClick} = props
  return (
    <ButtonSubmitTheme 
      type={type}
      onClick={onClick}
      varian={`bg-green-500 hover:bg-green-600 text-white ${varian}`}>
    {children}
    </ButtonSubmitTheme>
  );
}

export const ButtonPrimary = (props) => {
  const {url, children, varian,onClick} = props
  return (
    <ButtonTheme 
      url={url}
      onClick={onClick}
      varian={`bg-green-500 hover:bg-green-600 text-white ${varian}`}>
    {children}
    </ButtonTheme>
  );
}

export const ButtonDisabled = (props) => {
  const {url, children, varian,onClick} = props
  return (
    <ButtonTheme 
      url={url}
      onClick={onClick}
      varian={`text-white ${varian}`}>
    {children}
    </ButtonTheme>
  );
}

export const ButtonPrimaryMD = (props) => {
  const {url, children, varian, onClick} = props
  return (
    <Link 
      to={url}
      onClick={onClick}
      className={`${varian} block md:inline-block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition cursor-pointer`}>
    {children}
    </Link>
  );
}

export const ButtonPrimaryMDSubmit = (props) => {
  const {type, children, varian, onClick} = props
  return (
    <ButtonSubmitMDTheme 
      type={type}
      onClick={onClick}
      varian={`${varian}`}>
    {children}
    </ButtonSubmitMDTheme>
  );
}

export const ButtonWhiteMD = (props) => {
  const {url, children, varian,onClick} = props
  return (
    <Link 
      to={url}
      onClick={onClick}
      className={`${varian} block md:inline-block bg-white-500 text-green-500 border px-4 py-2 rounded-lg hover:bg-white-600 transition cursor-pointer`}>
    {children}
    </Link>
  );
}

export const ButtonWhite = (props) => {
  const {url, children, varian,onClick} = props
  return (
    <ButtonTheme 
      url={url}
      onClick={onClick}
      varian={`bg-white-500 border hover:bg-white-600 text-green-500 ${varian}`}>
    {children}
    </ButtonTheme>
  );
}

export const ButtonYellow = (props) => {
  const {url, children, varian} = props
  return (
    <ButtonTheme 
      url={url}
      varian={`bg-yellow-400 text-white cursor-pointer ${varian}`}>
    {children}
    </ButtonTheme>
  );
}

export const ButtonSecondary = (props) => {
  const {url, children, varian,onClick} = props
  return (
      <ButtonTheme 
        url={url}
        onClick={onClick}
        varian={`bg-green-100 text-green-600 hover:bg-green-200 ${varian}`}>
      {children}
      </ButtonTheme>
  );
}

export const ButtonSpan = (props) => {
  const {type, children, varian, onClick} = props
  return (
      <ButtonSubmitTheme 
        type={type}
        onClick={onClick}
        varian={`border flex items-center justify-center gap-2 ${varian}`}>
      {children}
       </ButtonSubmitTheme>
  );
}