import LoginForm from "./LoginForm";

function page() {
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
