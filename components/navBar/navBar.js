import Image from "next/image";
import jain from "@/public/icons/jain.webp";
import { BsPersonCircle } from "react-icons/bs";

export default function NavBar() {
  return (
    <nav className="w-full bg-white shadow-sm p-5 flex items-center">
      <div className="w-1/3 ">
        <Image src={jain} alt="Jain" height={50} />
      </div>
      <div className="w-2/3  flex items-center justify-end ">
        <div className="text-4xl mr-10 text-black">
          <a href="/user">
            <BsPersonCircle />
          </a>
        </div>
        <button className="bg-[#001b54]  p-4 rounded-lg">
          <h1>Logout</h1>
        </button>
      </div>
    </nav>
  );
}
