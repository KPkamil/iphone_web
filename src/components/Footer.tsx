import { footerLinks } from "@constants/index";

const Footer = () => {
  return (
    <footer className="py-5 sm:px-10 px-5">
      <div className="screen-max-width">
        <div>
          <p className="font-semibold text-gray text-xs">
            More ways to shop:{" "}
            <span className="underline text-blue">Find an Apple Store </span>
            or <span className="underline text-blue">other retailer</span> near
            you.
          </p>
          <p className="font-semibold text-gray text-xs mt-2">
            Or call 1-800-MY-APPLE.
          </p>
        </div>
        <div className="bg-neutral-700 my-5 h-[1px] w-full">
          <div className="flex md:flex-row flex-col md:items-center justify-between">
            <p className="font-semibold text-gray text-xs mt-2">
              Copright @ 2024 Apple Inc. All rights reserved.
            </p>
            <div className="flex flex-wrap mt-2 gap-y-1">
              {footerLinks.map((link, idx) => (
                <span
                  key={link}
                  className="font-semibold text-gray text-xs cursor-pointer"
                >
                  {link}
                  {idx !== footerLinks.length - 1 && (
                    <span className="mx-2"> | </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
