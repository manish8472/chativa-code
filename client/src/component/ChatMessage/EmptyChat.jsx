import welcome from "../../assets/welcome2.png";

const EmptyChat = ({ participantsDetails }) => {
  
  if(Object.keys(participantsDetails).length > 0) return null;

  return (
    <div className="hidden md:flex w-full h-screen flex-col pl-4 space-y-4 bg-white dark:bg-gray-900 overflow-hidden dark:text-white">
      <div className="flex flex-col justify-center items-center h-full">
        {/* <h1 className="text-3xl">Welcome to Chativa Application</h1> */}
        <div className="">
          <img src={welcome} alt="Sticker" className="w-full h-full " />
        </div>
        {/* <img src={sticker1} alt="Sticker" className="w-64 h-64 opacity-50"/> */}
      </div>
    </div>
  );
};

export default EmptyChat
