import { memo } from 'react';
import { Sorting, User } from './User.d';
import './UserList.scss';

interface Props {
  data: User[],
  showRowColors: boolean,
  onDelete: (id: string) => void,
  onSort: (column: Sorting) => void
}

const UserList = ({ data, showRowColors, onDelete, onSort }: Props) => {
  console.log('USER LIST rendered!!!!');  

  const tableClasses = showRowColors ? 'table-color-alternate' : '';

  return <table
          style={{ width: '100%', marginTop: '30px' }}
          className={tableClasses}>
    <thead>
      <tr className='header-actions'>
        <th>Foto</th>
        <th onClick={onSort.bind(null, Sorting.NAME)}>Nombre</th>
        <th onClick={onSort.bind(null, Sorting.LAST)}>Apellido</th>
        <th onClick={onSort.bind(null, Sorting.COUNTRY)}>País</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {
        data.map(item => {
          return (
            <tr key={item.login.uuid}>
              <td>
                <img src={item.picture.thumbnail} alt="" />
              </td>
              <td>
                {item.name.first}
              </td>
              <td>
                {item.name.last}
              </td>
              <td>
                {item.location.country}
              </td>
              <td>
                <button onClick={() => {onDelete(item.login.uuid); }}>Borrar</button>
              </td>
            </tr>
          );
        })
      }
    </tbody>
  </table>;
};

export default memo(UserList);