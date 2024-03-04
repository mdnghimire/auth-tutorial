const DashboardPage = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const users = await res.json();

  return (
    <div>
      Dashboard page
      <div>
        {users.map((e: any) => (
          <ul key={e.id}>
            <li>{e.username}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
