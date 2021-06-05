import React, { ReactElement, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import type { Action } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';

/** Types */
import type { UserRegister } from '../../../../redux/user/types';
import type { rootState } from '../../../../redux';

/** Actions */
import { userRegister } from '../../../../redux/user/thunk';

/** Components */
import InputCustom from '../../../common/InputCustom/InputCustom';
import Button from '../../../common/Button/Button';

/** Styles */
import styles from '../Authenticate.module.css';
import stylesButton from '../../../common/Button/Button.module.css';

interface Form {
    name: string;
    email: string;
    password: string;
}

const SignUp = ({ register, loadingUser }: TConnectedProps): ReactElement => {
    const [checkPassword, setCheckPassword] = useState<string>('');
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [form, setForm] = useState<Form>({
        name: '',
        email: '',
        password: '',
    });
    const { name, email, password } = form;

    const formatEmail = new RegExp(
        /^([\w-]+)\.?([\w-]+)@([A-Za-z]+)\.([A-Za-z]{2,})$/,
    );
    const formatPassword = new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
    );
    const formatName = new RegExp(
        /^([a-zA-Z0-9]+|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{1,}|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{3,}\s{1}[a-zA-Z0-9]{1,})$/,
    );

    /** Check if the fields are been fill */
    useEffect(() => {
        if (
            formatName.test(name) &&
            formatEmail.test(email) &&
            formatPassword.test(password) &&
            checkPassword === password
        ) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [name, email, password, checkPassword]);

    return (
        <form className={styles.formAuth}>
            <h2 className={styles.titleForm}>
                Join thousands of learners from around the world
            </h2>
            <InputCustom
                type="text"
                name="name"
                label="Name"
                value={name}
                setValue={(value: string, target: string) =>
                    setForm({ ...form, [target]: value })
                }
                pattern={formatName}
                messageError="Field is required"
                maxCount={50}
            />
            <InputCustom
                type="email"
                name="email"
                label="Email"
                value={email}
                setValue={(value: string, target: string) =>
                    setForm({ ...form, [target]: value })
                }
                pattern={formatEmail}
                messageError="address e-mail incorrect."
            />
            <InputCustom
                type="password"
                name="password"
                label="Password"
                value={password}
                setValue={(value: string, target: string): void =>
                    setForm({ ...form, [target]: value })
                }
                pattern={formatPassword}
                messageError="The password must contain at least 8 characters including 1 uppercase, 1 lowercase, 1 numeric and 1 special character."
            />
            <InputCustom
                type="password"
                name="password-check"
                label="Password check"
                value={checkPassword}
                setValue={(value: string) => setCheckPassword(value)}
                checkValue={password}
            />
            <Button
                submit
                value="Register"
                click={(e: Event) => {
                    e.preventDefault();
                    register(form);
                }}
                isDisabled={isDisabled}
                style={stylesButton.ButtonPrimary}
                loading={loadingUser}
            />
            <p className={styles.switchForm}>
                Already a member ?&ensp;
                <Link to="/authenticate/sign-in">sign-in</Link>
            </p>
        </form>
    );
};

const mapStateToProps = ({ user }: rootState) => ({
    loadingUser: user.loading,
});

const mapDispatchToProps = (
    dispatch: ThunkDispatch<rootState, void, Action>,
) => ({
    register: (user: UserRegister): void => dispatch(userRegister(user)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type TConnectedProps = ConnectedProps<typeof connector>;

export default connector(SignUp);
