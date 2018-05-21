import React from 'react'
import propTypes from 'prop-types'
import Select from 'react-select'
import { ALL_PARTNER } from '../../types'

const TacMemberEditTable = ({ newMembers,removedMembers, tacMembers, addMember, removeMember, saltUsers, partners, saveMembers }) => {
  const saltUsersList = ( saltUsers || [] ).map( u => ({ value: u, label: `${ u.surname } ${ u.name }` }))
  return(
    <div>
      { (partners || [] ).filter(f => !(f === ALL_PARTNER || f === 'OTH')).map( (p) => (
        <div className='stat-item' key={ `${ p }a` }>
          <h2>{p}</h2>
          <table className='admin-table'>
            <thead>
              <tr>
                <th>Surname</th>
                <th>Name</th>
                <th>Is chair</th>
                <th/>
              </tr>
            </thead>
            <tbody>
              {(tacMembers[ p ] || []).map((m) => (
                <tr key={ `${ m.name }b` }>
                  <td>{m.surname}</td>
                  <td>{m.name}</td>
                  <td>{m.isTacChair ? 'True': 'False'}</td>
                  <td>{!m.isTacChair && <button  onClick={ () => removeMember(m, p) }>- remove</button>}</td>
                </tr>))
              }
              {
                (newMembers[ p ] || []).map((m) => (
                  <tr key={ `${ m.name  }c` } className='new-tac-row'>
                    <td>{m.surname}</td>
                    <td>{m.name}</td>
                    <td>{m.isTacChair ? 'True': 'False'}</td>
                    <td>{!m.isTacChair && <button  onClick={ () => removeMember(m, p) }>- remove</button>}</td>
                  </tr>))
              }
              <tr key='newValue'>
                <td colSpan='4'>
                  <Select
                    className ='full-width'
                    options={ saltUsersList }
                    clearable={ false }
                    focusedOption='value'
                    onChange={ event => addMember(event.value, p) }
                  />
                </td>
              </tr>
              {
                (removedMembers[ p ] || []).map((m) => (
                  <tr key={ `${ m.name  }r` } className='removed-tac-row'>
                    <td className='strike'>{m.surname}</td>
                    <td className='strike'>{m.name}</td>
                    <td className='strike'>{m.isTacChair ? 'True': 'False'}</td>
                    <td>{!m.isTacChair && <button  onClick={ () => addMember(m, p) }>+ add again</button>}</td>
                  </tr>))
              }
            </tbody>
          </table>
          <button onClick={ () => saveMembers(p) }>save</button>
        </div>))
      }
    </div>)
}

TacMemberEditTable.propTypes = {
  newMembers: propTypes.object.isRequired,
  removedMembers: propTypes.object.isRequired,
  tacMembers: propTypes.object.isRequired,
  saveMembers: propTypes.func.isRequired,
  saltUsers: propTypes.array.isRequired,
  addMember: propTypes.func.isRequired,
  removeMember: propTypes.func.isRequired,
  partners: propTypes.array.isRequired
}

export default TacMemberEditTable
