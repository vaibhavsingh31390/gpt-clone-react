import "./LoadingSkeleton.css";
import bouncing from "./../../../assets/media/loader/bouncing.svg";
const LoadingSkeleton = () => {
  return (
    <div className="loading-canvas">
      <img src={bouncing} alt="loader" height={75} />
    </div>
  );
};

export default LoadingSkeleton;
