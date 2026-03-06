interface LoaderProps {
  size?: number;
  text?: string;
  fullScreen?: boolean;
}

const Loader = ({ size = 32, text, fullScreen = false }: LoaderProps) => {
  return (
    <div className={fullScreen ? "loader loader--fullscreen" : "loader"}>
      <div className="loader__spinner" style={{ width: size, height: size }} />
      {text ? <p className="loader__text">{text}</p> : null}
    </div>
  );
};

export default Loader;
