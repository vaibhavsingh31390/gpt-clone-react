/* eslint-disable react/prop-types */
import loader from "./../../../assets/media/loader/loaderwhite.svg";
function Loader({ height, width }) {
  return (
    <>
      <img
        src={loader}
        height={height || 20}
        width={width || 20}
        alt="loader"
      />
    </>
  );
}

export default Loader;
