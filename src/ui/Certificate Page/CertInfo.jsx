import PropTypes from 'prop-types';
export default function CertificateInfo({ certificateFrom, project, catagory, IssueDate }) {
  return (
    <div className="bg-[#F4F5FB] w-full  lg:w-1/2 lg:h-1/2 pb-7 lg:pb-0 shadow-sm ">
      <h2 className="text-xl md:text-xl lg:text-2xl xl:text-3xl  2xl:text-3xl  font-extrabold px-8 2xl:px-12 pt-8 lg:pt-6 xl:pt-8 2xl:pt-10  text-gray-900 ">
        Certificate Info
      </h2>
      <div className="space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-4 xl:space-y-4 2xl:space-y-4 px-8 2xl:px-10 pb-4 pt-6 xl:pt-8 2xl:pt-8">
        <div className="flex justify-between border-b border-gray-200 pb-1 lg:pb-1 xl:pb-4">
          <span className="text-gray-900 text-base md:text-base lg:text-lg 2xl:text-xl font-bold">Client:</span>
          <span className="text-gray-600 text-end md:text-sm lg:text-base 2xl:text-lg ">
            {certificateFrom}
          </span>
        </div>
        <div className="flex justify-between border-b border-gray-200 pb-1 lg:pb-1 xl:pb-4">
          <span className=" text-gray-900 text-base md:text-base lg:text-lg 2xl:text-xl font-bold">Project:</span>
          <span className="text-gray-600 text-end md:text-sm lg:text-base 2xl:text-lg">
            {project}
          </span>
        </div>
        <div className="flex justify-between border-b border-gray-200 pb-1 lg:pb-1 xl:pb-4">
          <span className=" text-gray-900  text-base md:text-base lg:text-lg 2xl:text-xl font-bold">Category:</span>
          <span className="text-gray-600 text-end md:text-sm lg:text-base 2xl:text-lg">
            {catagory}
          </span>
        </div>
        <div className="flex justify-between border-b  border-gray-200 pb-1 lg:pb-1 xl:pb-4 ">
          <span className=" text-gray-900 text-base md:text-base lg:text-lg 2xl:text-xl font-bold">Issue Date:</span>
          <span className=" text-gray-600 text-end md:text-sm lg:text-base 2xl:text-lg">
            {IssueDate}
          </span>
        </div>
      </div>
    </div>
  );
}
CertificateInfo.propTypes = {

  certificateFrom: PropTypes.string,
  project: PropTypes.string,
  catagory: PropTypes.string.isRequired,
  IssueDate: PropTypes.string,
};