import PropTypes from "prop-types";
import { EyeIcon } from "@heroicons/react/24/solid";
import { EyeSlashIcon } from "@heroicons/react/24/solid";

export const IconEye = ({ showPassword, togglePasswordVisibility }) => {
  return (
    <span onClick={togglePasswordVisibility}>
      {showPassword ? (
        <EyeIcon className="h-6 w-6 text-primary-green cursor-pointer" />
      ) : (
        <EyeSlashIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
      )}
    </span>
  );
};

IconEye.propTypes = {
  showPassword: PropTypes.bool.isRequired,
  togglePasswordVisibility: PropTypes.func.isRequired,
};
