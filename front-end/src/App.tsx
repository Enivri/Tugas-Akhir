import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import store from '@store';
import 'react-toastify/dist/ReactToastify.css';
import routes from '@constants/routes/api'
import Login from '@routes/Login';
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
import ViewPrediction from '@routes/ViewPrediction';
import AddPrediction from '@routes/AddPrediction';
import EditPrediction from '@routes/EditPrediction';
import Diagnosis from '@routes/Diagnosis';
import ViewDiagnosis from '@routes/ViewDiagnosis';
import AddDiagnosis from '@routes/AddDiagnosis';
import EditDiagnosis from '@routes/EditDiagnosis';
import Operation from '@routes/Operation';
import ViewOperation from '@routes/ViewOperation';
import AddOperation from '@routes/AddOperation';
import EditOperation from '@routes/EditOperation';
import CheckUp from '@routes/CheckUp';
import ViewCheckUp from '@routes/ViewCheckUp';
import AddCheckUp from '@routes/AddCheckUp';
import EditCheckUp from '@routes/EditCheckUp';
import adminRoutes from '@constants/routes/admin';
import Middleware from '@routes/Middleware';

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path={routes.login} element={<Login />}/>
					<Route path="/" element={<Middleware />}>
						<Route path={routes.home} element={<Home />}/>
						<Route path={adminRoutes.patient} element={<Patient />}/>
						<Route path={adminRoutes.addpatient} element={<AddPatient />}/>
						<Route path={adminRoutes.editpatient} element={<EditPatient />}/>
						<Route path={adminRoutes.viewpatient} element={<ViewPatient />}/>
						<Route path={adminRoutes.doctor} element={<Doctor />}/>
						<Route path={adminRoutes.adddoctor} element={<AddDoctor />}/>
						<Route path={adminRoutes.editdoctor} element={<EditDoctor />}/>
						<Route path={adminRoutes.viewdoctor} element={<ViewDoctor />}/>
						<Route path={adminRoutes.prediction} element={<Prediction />}/>
						<Route path={adminRoutes.viewprediction} element={<ViewPrediction />}/>
						<Route path={adminRoutes.addprediction} element={<AddPrediction />}/>
						<Route path={adminRoutes.editprediction} element={<EditPrediction />}/>
						<Route path={adminRoutes.diagnosis} element={<Diagnosis />}/>
						<Route path={adminRoutes.viewdiagnosis} element={<ViewDiagnosis />}/>
						<Route path={adminRoutes.editdiagnosis} element={<EditDiagnosis />}/>
						<Route path={adminRoutes.adddiagnosis} element={<AddDiagnosis />}/>
						<Route path={adminRoutes.operation} element={<Operation />}/>
						<Route path={adminRoutes.viewoperation} element={<ViewOperation />}/>
						<Route path={adminRoutes.addoperation} element={<AddOperation/>}/>
						<Route path={adminRoutes.editoperation} element={<EditOperation />}/>
						<Route path={adminRoutes.checkup} element={<CheckUp />}/>
						<Route path={adminRoutes.viewcheckup} element={<ViewCheckUp />}/>
						<Route path={adminRoutes.addcheckup} element={<AddCheckUp/>}/>
						<Route path={adminRoutes.editcheckup} element={<EditCheckUp />}/>
					</Route>
				</Routes>
				<GlobalStyle />
			</Router>
		</Provider>
	);
}

export default App;