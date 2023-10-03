import { useState, useEffect } from 'react';
import UserList from './UserList';
import { User } from './User.d';

const USER_BASE_URL = 'https://randomuser.me/api/';

const User = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showRowColors, setShowRowColors] = useState<boolean>(false);
  const [sortByCountry, setSortByCountry] = useState<boolean>(false);

  useEffect(() => {
    fetch(`${USER_BASE_URL}?results=100`)
      .then(response => response.json())
      .then(data => setUsers(data.results));
  }, []);

  const changeRowColorsHandler = () => {
    setShowRowColors(!showRowColors);
  };

  const sortByCountryHandler = () => {
    setSortByCountry(!sortByCountry);
  };

  const deleteHandler = (id: string) => {
    setUsers(users.filter(item => item.login.uuid !== id));
  };

  const finalUsers = sortByCountry
    ? users.toSorted((a, b) => {
      return a.location.country > b.location.country ? 1 : -1;
    })
    : users;

  return <>
    <header>
      <h1>Prueba técnica 02</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
        <button onClick={changeRowColorsHandler}>
          {showRowColors ? 'Descolorear filas' : 'Colorear filas'}
        </button>
        <button onClick={sortByCountryHandler}>
          {sortByCountry ? 'No ordenar por país' : 'Ordenar por país'}
        </button>
      </div>
    </header>
    <main>
      <UserList data={finalUsers} showRowColors={showRowColors} onDelete={deleteHandler} />
    </main>
  </>;
};

export default User;