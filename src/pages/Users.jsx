import SignUpForm from "../components/Auth/SignUpForm";
import Heading from "../ui/Heading";

function Users() {
  return (
    <>
      <Heading as="h1">Create a new user</Heading>
      <SignUpForm />
    </>
  );
}

export default Users;
