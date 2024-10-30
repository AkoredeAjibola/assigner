import userIcon from "../assets/user-icon.png";

const DashNavbar = () => {
  return (
    <div className="w-full h-auto font-montserrat font-semibold py-4 px-10 flex flex-row items-center justify-between bg-gray-300">
      <div className="">
        <p className="text-2xl  text-blue400 font-600 md:mb-0 mb-3">Assigner</p>
      </div>
      <div className="flex flex-row justify-end">
        <img
          src={userIcon}
          alt="User"
          className="rounded-full w-10 h-10 md:w-12 md:h-12"
        />
      </div>
    </div>
  );
};

export default DashNavbar;
