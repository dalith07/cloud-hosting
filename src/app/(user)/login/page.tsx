import LoginForm from "./LoginForm";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

async function page() {
  //const token = (await cookies()).get("jwtToken")?.value;

  // code fel middleware khir meli nhoto lena w f register
  // kif y3od andy token yaani andy user w nemchi lel url men fo9 namel /login myheznich khter andy compte
  //if (token) redirect("/");
  return (
    <section
      className="fix-height container m-auto px-7 flex 
    items-center justify-center"
    >
      <div className="m-auto bg-gray-200 rounded-2xl p-5 w-full md:w-2/3">
        <h1 className="text-xl font-bold text-gray-800 mb-5">Log In</h1>
        <LoginForm />
      </div>
    </section>
  );
}

export default page;
