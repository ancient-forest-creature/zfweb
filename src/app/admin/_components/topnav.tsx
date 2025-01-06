import Image from "next/image";

export const TopNav = () => {
  return (
    <div className="gap-4">
      <nav className="flex w-full items-center justify-between gap-4 border-b p-4 text-xl font-semibold">
        <div>Admin</div>
        <div> Login</div>
      </nav>
      <div className="flex w-full items-center justify-center p-4">
        <div className="w-1/5"></div>
        <div className="flex w-3/5 max-w-sm items-center justify-center">
          <Image
            src="https://utfs.io/f/CP1vGQdmthxyPSxgXafaQqdfG2FMOt1A6sEkLVNghCU7nyxm"
            width={3333}
            height={1304}
            alt="Zilka Forgewerks Logo"
          />
        </div>
        <div className="w-1/5"></div>
      </div>
    </div>
  );
};
