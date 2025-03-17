import RegisterForm from "./RegisterForm";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

async function page() {
  // const token = (await cookies()).get("jwtToken")?.value;

  // code fel middleware khir meli nhoto lena w f login
  // if (token) redirect("/"); // redirect yaamel throw l error yaani mnamlech return

  return (
    <section
      className="fix-height container m-auto px-7 flex 
    items-center justify-center"
    >
      <div className="m-auto bg-gray-200 rounded-2xl p-5 w-full md:w-2/3">
        <h1 className="text-xl font-bold text-gray-800 mb-5">
          Create New Accont
        </h1>
        <RegisterForm />
      </div>
    </section>
  );
}

export default page;
