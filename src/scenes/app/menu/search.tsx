import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import {BSTextBox} from '../../../components';
import {SetSearchTerm} from '../../../redux/menu/actions';

const MenuSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const updateSearchTermInState = (term: string) => {
    setSearchTerm(term);
    dispatch(SetSearchTerm(term));
  };

  return (
    <BSTextBox
      placeholder="Search for any item..."
      value={searchTerm}
      onChangeText={term => updateSearchTermInState(term)}></BSTextBox>
  );
};

export default MenuSearch;
