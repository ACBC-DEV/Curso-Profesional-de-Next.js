import { XCircleIcon } from '@heroicons/react/solid';
const Alert = ({ alert, handleClose }) => {
  if (alert && alert?.autoClose) {
    setTimeout(() => {
      handleClose();
    }, 3000);
  }

  return (
    <>
      {alert?.active && (
        <div x-data className={` bg-gray-200 p-5 w-full rounded  mb-8`}>
          <div className="flex space-x-3">
            <div className="flex-1 text-sm font-medium leading-tight text-black">{alert.message}</div>
            <button type="button">
              <XCircleIcon className="w-6 h-6 text-gray-600" onClick={handleClose} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default Alert;
