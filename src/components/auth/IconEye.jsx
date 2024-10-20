import PropTypes from "prop-types";
import { EyeIcon } from "@heroicons/react/24/outline";
import { EyeSlashIcon } from "@heroicons/react/24/solid";

const IconEye = ({ showPassword, togglePasswordVisibility }) => {
  return (
    <span onClick={togglePasswordVisibility} style={{ cursor: "pointer" }}>
      {showPassword ? (
        <EyeSlashIcon className="h-6 w-6 text-lime-400" />
      ) : (
        <EyeIcon className="h-6 w-6 text-lime-400" />
      )}
    </span>
  );
};

IconEye.propTypes = {
  showPassword: PropTypes.bool.isRequired,
  togglePasswordVisibility: PropTypes.func.isRequired,
};

export default IconEye;
