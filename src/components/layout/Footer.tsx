import { Link } from "react-router-dom";
import { Calendar, Pill, User } from "lucide-react";

const Footer = () => {
  return (
    <div className="bg-white shadow-lg flex justify-between items-center p-4 px-12">
      <div className="flex-1 text-center">
        <Link to="/">
          <Calendar className="w-6 h-6 mx-auto" />
        </Link>
      </div>

      <div className="flex-1 text-center relative">
        <div className="w-16 h-16 bg-sky-500 rounded-full flex justify-center items-center mx-auto relative">
          <Link to="/form">
            <Pill
              className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              size={32}
            />
          </Link>
        </div>
      </div>

      <div className="flex-1 text-center">
        <Link to="/my">
          <User className="w-6 h-6 mx-auto" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
