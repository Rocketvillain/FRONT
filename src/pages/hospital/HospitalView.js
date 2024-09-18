import React from 'react';
import UserHeader from '../../components/commons/header/UserHeader';
import '../../css/HospitalList.css'
import HospitalList from '../../components/lists/HospitalList';

function HospitalView() {

    return(
        <>
        <UserHeader/>
        <HospitalList/>
        </>
    )

}

export default HospitalView;