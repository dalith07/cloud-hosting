import Hero from "@/components/home/Hero";
import WebHostingPlan from "@/components/home/WebHostingPlan";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <h2 className="text-center mt-10 text-3xl font-bold">
        Choose Your Hosting Plan
      </h2>

      <div
        className="container m-auto flex justify-center items-center
      my-7 flex-wrap md:gap-7"
      >
        <WebHostingPlan />
        <WebHostingPlan />
        <WebHostingPlan />
      </div>
    </div>
  );
};

export default HomePage;

// HTTP Protocol

// CRUD Opertions
// C create R read U update D delete

//HTTP Methods
// GET POST DELETE PUT

// HTTP Request & HTTP Response
// Includes { headers: {...metadata}, body: {...data} }

// HTTP Status Code
// 404 NOt Found, 400 Bad Request, 200 Successfull, 201 Created Successfully
