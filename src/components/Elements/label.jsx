const Label = (props) => {
    const {children,htmlfor} = props
    return (
        <label 
        htmlFor={htmlfor}
        className="block text-slate-700 text-sm font-bold mb-2">{children}</label>
    )
}

export default Label