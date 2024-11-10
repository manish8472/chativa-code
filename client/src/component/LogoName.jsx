import logo from "../assets/chat-bubble.png";

const LogoName = () => {
  return (
    <div className="flex flex-row items-center justify-center ">
      <img
        className="w-12 h-12 mb-4"
        src={logo} // You can replace this with your logo alt="Chatvia Logo" " // You can replace this with your logo
      />
      <h2 className="text-2xl font-semibold mb-4 text-gray-500 pl-4 dark:text-gray-400">
        Chativa
      </h2>
    </div>
  );
}

export default LogoName
