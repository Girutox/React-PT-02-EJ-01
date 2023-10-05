import { memo } from 'react';
import { User } from './User.d';
import './UserList.scss';

interface Props {
  data: User[],
  showRowColors: boolean,
  onDelete: (id: string) => void
}

const UserList = ({ data, showRowColors, onDelete }: Props) => {
  console.log('USER LIST rendered!!!!');  

  const tableClasses = showRowColors ? 'table-color-alternate' : '';

  return <table
          style={{ width: '100%', marginTop: '30px' }}
          className={tableClasses}>
    <thead>
      <tr>
        <th>Foto</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>País</th>
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