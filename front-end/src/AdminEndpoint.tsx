import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '@routes/Home';
import Patient from '@routes/Patient'
import AddPatient from '@routes/AddPatient';
import EditPatient from "@routes/EditPatient"
import ViewPatient from "@routes/ViewPatient"
import Doctor from '@routes/Doctor';
import AddDoctor from '@routes/AddDoctor';
import ViewDoctor from '@routes/ViewDoctor';
import EditDoctor from '@routes/EditDoctor';
import Prediction from '@routes/Prediction';
import AddPrediction from '@routes/AddPrediction';
import Diagnosis from '@routes/Diagnosis';
import Operation from '@routes/Operation';
import CheckUp from '@routes/CheckUp';
import routes from '@constants/routes/admin'
import Middleware from '@routes/Middleware';

export const AdminEndpoint = () => {
    return (
        <Routes>
            
        </Routes>
    )
}
