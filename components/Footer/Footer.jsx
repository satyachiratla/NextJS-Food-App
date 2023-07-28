import Image from "next/image";
import insta from "../../public/assets/images/insta.png";
import linkedin from "../../public/assets/images/linkedin.png";
import github from "../../public/assets/images/github.png";

export default function Footer() {
  return (
    <section>
      <div className="flex flex-row items-center justify-center px-8 py-4">
        <a
          href="https://www.instagram.com/v.i.v.e.k_c.h.o.w.d.a.r.y/"
          title="instagram profile"
          className="mx-2"
        >
          <Image src={insta} alt="instagram" width={30} />
        </a>
        <a
          href="https://github.com/satyachiratla"
          title="github profile"
          className="mx-2"
        >
          <Image src={github} alt="github" width={30} />
        </a>
        <a
          href="https://www.linkedin.com/in/satya-chiratla-378b31165/"
          title="linkedin profile"
          className="mx-2 "
        >
          <Image src={linkedin} alt="linkedin" width={30} />
        </a>
      </div>
      <div className="text-center mb-8">
        <p className="text-lg tracking-wide font-lunasima text-white">
          {" "}
          Made with ❤️ by Vivek
        </p>
        <p className="text-zinc-200"> © {new Date().getFullYear()} Reserved</p>
      </div>
    </section>
  );
}
