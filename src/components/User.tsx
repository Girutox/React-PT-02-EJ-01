import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import UserList from './UserList';
import { User } from './User.d';

const USER_BASE_URL = 'https://randomuser.me/api/';

const User = () => {
  const [users, setUsers] = useState<User[]>([]);
  const originalUsers = useRef<User[]>([]);
  const [showRowColors, setShowRowColors] = useState<boolean>(false);
  const [sortByCountry, setSortByCountry] = useState<boolean>(false);
  const [filterCountry, setFilterCountry] = useState<string>('');

  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    fetch(`${USER_BASE_URL}?results=100`)
      .then(response => response.json())
      .then(data => {
        setUsers(data.results);
        originalUsers.current = data.results;
      });
  }, []);

  const changeRowColorsHandler = () => {
    setShowRowColors(!showRowColors);
  };

  const sortByCountryHandler = () => {
    setSortByCountry(!sortByCountry);
  };

  const deleteHandler = useCallback((id: string) => {
    setUsers(users.filter(item => item.login.uuid !== id));
  }, [users]);

  const resetStateHandler = () => {
    setUsers(originalUsers.current);
  };

  const filteredUsers = useMemo(() => {
    console.log('FILTER executed!!');    

    return users.filter(item => {
      return item.location.country.toLowerCase().includes(filterCountry.toLowerCase());
    });
  }, [filterCountry, users]);

  const finalUsers = useMemo(() => {
    console.log('SORTING executed!!');

    return sortByCountry
      ? filteredUsers.toSorted((a, b) => {
        return a.location.country > b.location.country ? 1 : -1;
      })
      : filteredUsers;
  }, [filteredUsers, sortByCountry]);

  // const filteredUsers = (() => {
  //   console.log('FILTER executed!!');    

  //   return users.filter(item => {
  //     return item.location.country.toLowerCase().includes(filterCountry.toLowerCase());
  //   });
  // })();

  // const finalUsers = (() => {
  //   console.log('SORTING executed!!');

  //   return sortByCountry
  //     ? filteredUsers.toSorted((a, b) => {
  //       return a.location.country > b.location.country ? 1 : -1;
  //     })
  //     : filteredUsers;
  // })();

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
        <button onClick={resetStateHandler}>Resetear estado</button>
        <input
          type="text"
          placeholder='Filtra por país'
          onChange={e => setFilterCountry(e.target.value)} />
      </div>
    </header>
    <main>
      <hr />
      <div>
        <p>{count}</p>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <hr />
      <UserList
        data={finalUsers}
        showRowColors={showRowColors}
        onDelete={deleteHandler} />
    </main>
  </>;
};

export default User;