import React from 'react';
import s from './NewPassword.module.css'
import SuperButton from '../../../../a1-main/b1-ui/common/superButton/SuperButton';
import {setNewPasswordTC} from '../../../../a1-main/b2-bll/passwordRestoreReducer';
import {useAppSelector, useTypedDispatch} from '../../../../a1-main/b2-bll/store';
import {useNavigate, useParams} from 'react-router-dom';
import {Frame} from '../../../../a1-main/b1-ui/common/frame/Frame';
import SuperInputPassword from '../../../../a1-main/b1-ui/common/superInputPassword/SuperInputPassword';
import {Formik} from 'formik';
import * as yup from 'yup';
import {PATH} from '../../../../a1-main/b1-ui/routes/RoutesComponent';

export const NewPassword = () => {

    const isChangedPassword = useAppSelector((state) => state.restore.isChangedPassword)
    const navigate = useNavigate()
    const dispatch = useTypedDispatch()
    const params = useParams<'*'>()
    const token = params['*']
    console.log(token)


    const validations = yup.object().shape({
        password: yup.string().typeError('Must be a string').required('The field is required'),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'The passwords do not match').required('The field is required')
    })

    if (isChangedPassword) {
        navigate(PATH.CHECK_EMAIL)
    }

    return (
        <Formik
            initialValues={{
                password: '',
                confirmPassword: ''
            }}
            validateOnBlur
            onSubmit={(values) => {
                console.log(values)
                dispatch(setNewPasswordTC(values.password, token))
            }}
            validationSchema={validations}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  isValid,
                  handleSubmit,
                  dirty
              }) => {
                debugger
                return (
                    <>
                        <Frame>
                            <span><strong>It-incubator</strong></span>
                            <h2>Create New Password</h2>
                            <div className={s.input}>
                                <SuperInputPassword value={values.password} onChange={handleChange} name={'password'}
                                                    onBlur={handleBlur} placeholder={'New password'} className={s.input}/>
                                <div className={s.errors}>{touched.password && errors.password ? errors.password : null}</div>

                                <SuperInputPassword value={values.confirmPassword} onChange={handleChange} name={'confirmPassword'}
                                                    onBlur={handleBlur} placeholder={'Confirm new password'}/>
                                <div className={s.errors}>{touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : null}</div>
                            </div>
                            <SuperButton
                                onClick={() => {handleSubmit()}}
                                disabled={!isValid && !dirty} type={'submit'}
                            >Create New Password</SuperButton>
                        </Frame>
                    </>
                )
            }}
        </Formik>
    );
};