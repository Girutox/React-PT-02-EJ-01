import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import UserList from './UserList';
import { Sorting, User } from './User.d';

const USER_BASE_URL = 'https://randomuser.me/api/';

const User = () => {
  const [users, setUsers] = useState<User[]>([]);
  const originalUsers = useRef<User[]>([]);
  const [showRowColors, setShowRowColors] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<Sorting>(Sorting.NONE);
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

  const sortByHandler = (column: Sorting) => {
    if (column === sortBy) {
      setSortBy(Sorting.NONE);
      return;
    }

    setSortBy(column);
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

    if (sortBy === Sorting.NONE) return filteredUsers;

    const variants = {
      [Sorting.NAME]: (user: User) => user.name.first,
      [Sorting.LAST]: (user: User) => user.name.last,
      [Sorting.COUNTRY]: (user: User) => user.location.country
    };

    // let sortingCallback: (a: User, b: User) => number;

    // if (sortBy === Sorting.NAME) {
    //   sortingCallback = (a: User, b: User) => a.name.first > b.name.first ? 1 : -1;
    // }

    // if (sortBy === Sorting.LAST) {
    //   sortingCallback = (a: User, b: User) => a.name.last > b.name.last ? 1 : -1;
    // }

    // if (sortBy === Sorting.COUNTRY) {
    //   sortingCallback = (a: User, b: User) => a.location.country > b.location.country ? 1 : -1;
    // }

    return filteredUsers.toSorted((a: User, b: User) => {
      const fn = variants[sortBy];
      const item1 = fn(a);
      const item2 = fn(b);

      return item1 > item2 ? 1 : -1;
    });
  }, [filteredUsers, sortBy]);

  return <>
    <header>
      <h1>Prueba técnica 02</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
        <button onClick={changeRowColorsHandler}>
          {showRowColors ? 'Descolorear filas' : 'Colorear filas'}
        </button>
        <button onClick={() => sortByHandler(Sorting.COUNTRY)}>
          {sortBy === Sorting.COUNTRY ? 'No ordenar por país' : 'Ordenar por país'}
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
        onDelete={deleteHandler}
        onSort={sortByHandler} />
    </main>
  </>;
};

export default User;