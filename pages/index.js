import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <div>
        <Link href="/login">
            <button>Go to Login</button>
        </Link>
        <Link href="/signup">
            <button>Go to Signup</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
